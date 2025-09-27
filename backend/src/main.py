# main.py
# To run this application:
# 1. Install the required libraries:
#    pip install fastapi uvicorn sqlalchemy python-multipart
# 2. Run the server from your terminal:
#    uvicorn main:app --reload

import databases
import sqlalchemy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

# --- Configuration ---
# Define the database URL. For SQLite, it's sqlite:///./your_database_name.db
DATABASE_URL = "sqlite:///./vehicle_data.db"

# SQLAlchemy setup
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Define the table structure for our data
data_points = sqlalchemy.Table(
    "vehicle_data",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("timestamp", sqlalchemy.DateTime, nullable=False),
    sqlalchemy.Column("speed", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("slope", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("recharge_rate", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("battery_consumption", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("temperature", sqlalchemy.Float, nullable=False),
)

# Create the database and the table if they don't exist
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
metadata.create_all(engine)


# --- Pydantic Model ---
# This defines the structure and data types for the incoming request body.
# FastAPI will automatically handle validation based on this model.
class DataPoint(BaseModel):
    timestamp: datetime
    speed: float
    slope: float
    recharge_rate: float
    battery_consumption: float
    temperature: float


# --- FastAPI Application ---
app = FastAPI(
    title="Vehicle Data API",
    description="An API to log vehicle sensor data to a SQLite database.",
    version="1.0.0",
)

# Allow frontend to access the API during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# --- Event Handlers ---
# These functions handle connecting to and disconnecting from the database
# when the FastAPI application starts up and shuts down.
@app.on_event("startup")
async def startup():
    """Connect to the database on application startup."""
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    """Disconnect from the database on application shutdown."""
    await database.disconnect()


# --- API Endpoints ---
@app.post("/data/", response_model=DataPoint)
async def write_data(data_point: DataPoint):
    """
    Accepts vehicle data and writes it to the SQLite database.

    - **timestamp**: The ISO 8601 formatted timestamp of the reading.
    - **speed**: The vehicle's speed in km/h.
    - **slope**: The slope of the terrain in degrees.
    - **recharge_rate**: The battery recharge rate in kW.
    - **battery_consumption**: The battery consumption rate in kW.
    - **temperature**: The ambient temperature in Celsius.
    """
    # Create the SQL query to insert the data
    query = data_points.insert().values(
        timestamp=data_point.timestamp,
        speed=data_point.speed,
        slope=data_point.slope,
        recharge_rate=data_point.recharge_rate,
        battery_consumption=data_point.battery_consumption,
        temperature=data_point.temperature
    )
    
    # Execute the query and get the ID of the last inserted row
    last_record_id = await database.execute(query)
    
    # Return the created data point, including the generated ID
    return {**data_point.dict(), "id": last_record_id}


@app.get("/data/all")
async def read_all_data():
    """Return all rows from the vehicle_data table."""
    query = data_points.select().order_by(data_points.c.id.desc())
    rows = await database.fetch_all(query)
    # convert SQLAlchemy Row objects to dicts
    return [dict(row) for row in rows]

@app.get("/")
def read_root():
    """A simple root endpoint to confirm the API is running."""
    return {"message": "Welcome to the Vehicle Data API. Use the /docs endpoint to see the API documentation."}
