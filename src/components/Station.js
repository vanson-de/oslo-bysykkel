import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Container, Alert } from "reactstrap";

import Navigation from "./Navigation";

import tim from '../img/tim.png';

import { Bicycle } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';
import { GeoAltFill } from 'react-bootstrap-icons';

const Station = () => {
	const location = useLocation();
	
	const [station, setStation] = useState("");
	const [stationId, setStationId] = useState("");
	const [stationName, setStationName] = useState("");
	const [stationAddress, setStationAddress] = useState("");
	const [stationDistance, setStationDistance] = useState("");
	const [stationAvailableBikes, setStationAvailableBikes] = useState("");
	const [stationAvailableDocks, setStationAvailableDocks] = useState("");

	const [stationRentalLink, setStationRentalLink] = useState("");
	const [stationMapsLink, setStationMapsLink] = useState("");
	
	useEffect(() => {
		if (location.state && location.state.station) {
			setStation(location.state.station);
			setStationId(location.state.station_id);
			setStationName(location.state.name);
			setStationAddress(location.state.address);
			setStationDistance(location.state.distance);
			setStationAvailableBikes(location.state.num_bikes_available);
			setStationAvailableDocks(location.state.num_docks_available);
			
			setStationRentalLink(location.state.station.rental_uris.android);
			
			const mapsLink = "http://www.google.com/maps/place/" + location.state.station.lat + "," + location.state.station.lon
			setStationMapsLink(mapsLink);
			
		} else {
			//oh well...
		}
		
		return () => {
			
		};
	
	}, []);

	return (
	
	<>
	
	<Navigation />
	
	<main className="my-5 py-5">

		<Container className="px-0">
		</Container>
		
		
		<div id="wrapper">

			<div id="content-wrapper" className="d-flex flex-column">

				<div id="content">

					<div className="container-fluid">
					
						<div className="row">
							<h1 className="txt_center">Welcome to Station: {stationName}</h1>
						</div>
						
						<div className="tim_container txt_center">
							<img src={tim}  alt="logo" />
						</div>

						<div className="row p_20 txt_center">
							<div>
								<Alert color="info">
									Station ID: {stationId}, Address: {stationAddress}
								</Alert>
							</div>
						
							<div>
								<Alert color="primary">
									<Bicycle className="icon_sm"/>{stationAvailableBikes} free bicycles, <Key className="icon_sm"/>{stationAvailableDocks} free docks, <GeoAltFill className="icon_sm"/>{stationDistance}km from you.
								</Alert>
							</div>
							
							<div className="col-xl-6 col-md-6 mb-6">
								<a href={stationRentalLink} target="_blank" rel="noreferrer">
									<div className="column_wrapper">
										<div className="icon_container">
											<Bicycle className="icon"/> 
										</div>
										<div className="column_txt">
											Start Rental Process
										</div>
									</div>
								</a>
							</div>

							<div className="col-xl-6 col-md-6 mb-6">
								<a href={stationMapsLink} target="_blank" rel="noreferrer">
									<div className="column_wrapper">
										<div className="icon_container">
											<GeoAltFill className="icon"/> 
										</div>
										<div className="column_txt">	
											Show Station on Maps
										</div>
									</div>
								</a>
							</div>
							
						</div>
					
					</div>
					
				</div>
				
			</div>
		
		</div>

	</main>
		
	</>
	);
};

export default Station;