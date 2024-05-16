from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from mysql.connector import Error
from harbor_pydantic import *
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Establishing MySQL Server Connection (Currently Local)
def get_new_connection():
    try:
        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            passwd="*neoSQL01",
            database="central_database"
        )
        print("MySQL Database connection successful")
        return connection
    except Error as err:
        print(f"Error: '{err}'")
        return None

#API Endpoints
# Get shipment based on harbor_ID
@app.get("/shipment/{harbor_ID}", response_model=List[HarborCheckpoint])
def get_shipment_by_harbor(harbor_ID: int):
    conn = get_new_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    cursor = conn.cursor(dictionary=True)  # Use dictionary to directly map query results to model fields
    try:
        cursor.execute("SELECT * FROM harbor_checkpoint WHERE harbor_ID = %s", (harbor_ID,))
        result = cursor.fetchall()
        if not result:
            raise HTTPException(status_code=404, detail="Shipment not found")
        return [HarborCheckpoint(**row) for row in result]
    except Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        cursor.close()
        conn.close()