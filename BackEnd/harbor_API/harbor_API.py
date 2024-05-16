from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from typing import List
from fastapi.responses import JSONResponse
from harbor_pydantic import *

app = FastAPI()

# CORSMiddleware Config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
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
# Get ALL harbor information.
@app.get("/harbor_checkpoints", response_model=List[HarborCheckpointInformation])
def get_harbor_checkpoints():
    connection = get_new_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection could not be established")
    
    cursor = connection.cursor()
    try:
        cursor.execute("""
            SELECT hc.checkpoint_ID, hc.harbour_batch_rescale, hc.sent_date, hc.arrival_date, hc.transport_status,
                   b.batch_ID, b.batch_date, b.status,
                   dl.dry_leaves_ID, dl.dry_weight, dl.dry_date, dl.dry_image,
                   wl.wet_leaves_ID, wl.wet_weight, wl.wet_date, wl.wet_image,
                   pl.powdered_leaves_ID, pl.powdered_weight, pl.powdered_date, pl.powdered_image,
                   hc.hg_user_ID
            FROM harbor_checkpoint hc
            JOIN batch_information b ON hc.batch_ID = b.batch_ID
            LEFT JOIN dry_leaves dl ON b.dry_leaves_ID = dl.dry_leaves_ID
            LEFT JOIN wet_leaves wl ON b.wet_leaves_ID = wl.wet_leaves_ID
            LEFT JOIN powdered_leaves pl ON b.powdered_leaves_ID = pl.powdered_leaves_ID;
        """)
        rows = cursor.fetchall()
        connection.close()
        return [HarborCheckpointInformation(
            checkpoint_ID=row[0],
            harbour_batch_rescale=row[1],
            sent_date=row[2],
            arrival_date=row[3],
            transport_status=row[4],
            batch_ID=row[5],
            batch_date=row[6],
            status=row[7],
            dry_leaves_ID=row[8],
            dry_leaves=DryLeaves(
                dry_leaves_ID=row[8],
                dry_weight=row[9],
                dry_date=row[10],
                dry_image=row[11]
            ) if row[8] else None,
            wet_leaves_ID=row[12],
            wet_leaves=WetLeaves(
                wet_leaves_ID=row[12],
                wet_weight=row[13],
                wet_date=row[14],
                wet_image=row[15]
            ) if row[12] else None,
            powdered_leaves_ID=row[16],
            powdered_leaves=PowderedLeaves(
                powdered_leaves_ID=row[16],
                powdered_weight=row[17],
                powdered_date=row[18],
                powdered_image=row[19]
            ) if row[16] else None,
            hg_user_ID=row[20]
        ) for row in rows]
    except mysql.connector.Error as err:
        connection.close()
        raise HTTPException(status_code=500, detail=str(err))

# Get 1 shipment infomation
@app.get("/harbor_checkpoint/{checkpoint_ID}", response_model=HarborCheckpointInformation)
def get_harbor_checkpoint(checkpoint_ID: int):
    connection = get_new_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection could not be established")

    cursor = connection.cursor()
    try:
        cursor.execute("""
            SELECT hc.checkpoint_ID, hc.harbour_batch_rescale, hc.sent_date, hc.arrival_date, hc.transport_status,
                   b.batch_ID, b.batch_date, b.status,
                   dl.dry_leaves_ID, dl.dry_weight, dl.dry_date, dl.dry_image,
                   wl.wet_leaves_ID, wl.wet_weight, wl.wet_date, wl.wet_image,
                   pl.powdered_leaves_ID, pl.powdered_weight, pl.powdered_date, pl.powdered_image,
                   hc.hg_user_ID
            FROM harbor_checkpoint hc
            JOIN batch_information b ON hc.batch_ID = b.batch_ID
            LEFT JOIN dry_leaves dl ON b.dry_leaves_ID = dl.dry_leaves_ID
            LEFT JOIN wet_leaves wl ON b.wet_leaves_ID = wl.wet_leaves_ID
            LEFT JOIN powdered_leaves pl ON b.powdered_leaves_ID = pl.powdered_leaves_ID
            WHERE hc.checkpoint_ID = %s;
        """, (checkpoint_ID,))
        row = cursor.fetchone()
        connection.close()
        if row:
            return HarborCheckpointInformation(
                checkpoint_ID=row[0],
                harbour_batch_rescale=row[1],
                sent_date=row[2],
                arrival_date=row[3],
                transport_status=row[4],
                batch_ID=row[5],
                batch_date=row[6],
                status=row[7],
                dry_leaves_ID=row[8],
                dry_leaves=DryLeaves(
                    dry_leaves_ID=row[8],
                    dry_weight=row[9],
                    dry_date=row[10],
                    dry_image=row[11]
                ) if row[8] else None,
                wet_leaves_ID=row[12],
                wet_leaves=WetLeaves(
                    wet_leaves_ID=row[12],
                    wet_weight=row[13],
                    wet_date=row[14],
                    wet_image=row[15]
                ) if row[12] else None,
                powdered_leaves_ID=row[16],
                powdered_leaves=PowderedLeaves(
                    powdered_leaves_ID=row[16],
                    powdered_weight=row[17],
                    powdered_date=row[18],
                    powdered_image=row[19]
                ) if row[16] else None,
                hg_user_ID=row[20]
            )
        else:
            raise HTTPException(status_code=404, detail="Checkpoint not found")
    except mysql.connector.Error as err:
        connection.close()
        raise HTTPException(status_code=500, detail=str(err))
