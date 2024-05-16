import random
import os
import shutil
from typing import List

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

from harbor_pydantic import *

import mysql.connector

import datetime

connect = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='*neoSQL01',
    database='central_database'
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/harbor/get_all_shipments/{harbor_id}", response_model=List[HarborCheckpoint])
def get_all_shipments(harbor_id):
    db = connect.cursor()
    db.execute("SELECT harbor_checkpoint.* FROM harbor_checkpoint "
               "JOIN harbor_guard_user ON harbor_checkpoint.hg_user_ID = harbor_guard_user.hg_user_ID "
               "WHERE harbor_guard_user.hg_user_ID = %s "
               "ORDER BY harbor_checkpoint.sent_date DESC;",
               (harbor_id,))
    return db.fetchall()


@app.get("/harbor/get_recent_shipments/{harbor_id}/{n}", response_model=List[HarborCheckpoint])
def get_recent_shipments(harbor_id, n):
    db = connect.cursor()
    db.execute("SELECT harbor_checkpoint.* FROM harbor_checkpoint "
               "JOIN harbor_guard_user ON harbor_checkpoint.hg_user_ID = harbor_guard_user.hg_user_ID "
               "WHERE harbor_guard_user.hg_user_ID = %s "
               "ORDER BY harbor_checkpoint.sent_date DESC;",
               (harbor_id,))
    return db.fetchall()[:int(n)]


@app.get("/harbor/get_shipment/{harbor_id}/{shipment_id}", response_model=HarborCheckpoint)
def get_shipment(harbor_id, shipment_id):
    db = connect.cursor()
    db.execute("SELECT harbor_checkpoint.* FROM harbor_checkpoint "
               "JOIN harbor_guard_user ON harbor_checkpoint.hg_user_ID = harbor_guard_user.hg_user_ID "
               "WHERE harbor_guard_user.hg_user_ID = %s "
               "AND harbor_checkpoint.checkpoint_ID = %s;",
               (harbor_id, shipment_id))
    i = db.fetchone()
    if len(i) == 1:
        return i[0]
    return "not found"


@app.put("/updateShipment/{harbor_id}/{shipment_id}/{status}")
def update_shipment(harbor_id, shipment_id, status):
    db = connect.cursor()
    db.execute("UPDATE harbor_checkpoint "
                "JOIN harbor_guard_user ON harbor_checkpoint.hg_user_ID = harbor_guard_user.hg_user_ID "
                "SET harbor_checkpoint.transport_status = %s "
                "WHERE harbor_guard_user.hg_user_ID = %s "
                "AND harbor_checkpoint.checkpoint_ID = %s;",
               (status, harbor_id, shipment_id))
    connect.commit()


@app.post("/addPhoto/{harbor_id}/{shipment_id}")
async def upload_photo(harbor_id, shipment_id, file: UploadFile = File(...)):
    try:
        db = connect.cursor()
        db.execute("SELECT harbor_checkpoint.checkpoint_ID FROM harbor_checkpoint "
                   "JOIN harbor_guard_user ON harbor_checkpoint.hg_user_ID = harbor_guard_user.hg_user_ID "
                   "WHERE harbor_guard_user.hg_user_ID = %s "
                   "AND harbor_checkpoint.checkpoint_ID = %s;",
                   (harbor_id, shipment_id))
        shipment_id = db.fetchone()
        if len(shipment_id) == 1:
            shipment_id = shipment_id[0]
            try:
                db.execute("INSERT INTO checkpoint_pictures (checkpointID, image_path) "
                           "values (%s, %s)", (shipment_id, "uploads/" + file.filename))
                with open(os.path.join("uploads", file.filename), "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                return {"message": "File uploaded successfully"}
            except:
                return "Unknown error"
        else:
            return {"error": "invalid harbor id/checkpoint id"}
    except Exception as e:
        return {"error": str(e)}


@app.get("/getPhoto/{path}")
def get_photo(path):
    if os.path.exists(path):
        return FileResponse(path=path)
    else:
        return JSONResponse(content={"error": "File not found"}, status_code=404)