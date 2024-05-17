import React, { useEffect, useState } from 'react';
import styles from "./OngoingShipmentContainer.module.css";
import { Link } from 'react-router-dom';
import ShipmentItem from './ShipmentItem';
import axios from 'axios';

const OngoingShipmentContainer = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/shipments');
        setShipments(response.data);
      } catch (error) {
        console.error('Failed to fetch shipments', error);
      }
    };

    fetchShipments();
  }, []);

  return (
    shipments.map((shipment, index) => (
      <ShipmentItem key={index} shipment={shipment} />
    ))
  );
  
};

export default OngoingShipmentContainer;
