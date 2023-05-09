import React, { useState, useEffect, useRef } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Container, Alert } from "reactstrap";

import Notification from "./Notification";
import Navigation from "./Navigation";
import BikeList from "./BikeList";

import rqh from "../helpers/rqh";

const Bike = () => {
	const navigation = useNavigate();
	const modalRef = useRef();
	
	const [searchParams] = useSearchParams();
	
	//some statics
	const your_address = "Slotsplassen 1, 0010 Oslo";
	const your_lat = 59.916590;
	const your_lon = 10.729329;
	
	const [mode, setMode] = useState([]);
	const [updated, setUpdated] = useState(false);
	const [showAll, setShowAll] = useState(false);
	
	const [stationData, setStationData] = useState([]);
	const [displayData, setDisplayData] = useState([]);

	useEffect(() => {	
		console.log("use effect");
		setMode(searchParams.get("q"));
		
		if (!updated) {
			console.log("updated: " + updated);
			showNotification("Notification", "Loading bike stations for you", true, [{caption: "Okay", onClick: hideNotification}]);
			
			const fetchStations = async () => {
				const stations = await getStations();

				showNotification("Notification", "Loading bike stations stati for you", true, [{caption: "Okay", onClick: hideNotification}]);
				
				const fetchStati = async () => {
					const stati = await getStati();
					
					const allStationData = buildStationData(stations, stati);
					console.log(allStationData);
					
					const sortedStationData = sortStationData(allStationData, searchParams.get("q"));
					console.log(sortedStationData);
					
					setStationData(allStationData);
					
					if(!showAll) setDisplayData(sortedStationData.slice(0, 5)) 
						else setDisplayData(allStationData);
					
					setUpdated(true);
				}			
				fetchStati(); 
				
			}			
			fetchStations(); 
			
		} else {
			hideNotification();
		} 
		
		return () => {
			
		};
	
	}, [updated, showAll]);
	
	const buildStationData = (stations, stati) => {
		console.log("build data table of stations and their stati.");
		let data = [];
		
		for (var i in stations.data.stations) {
			let station = stations.data.stations[i];		
			data.push(station);
			
			let distance = getDistanceFromLatLonInKm(station.lat, station.lon, your_lat, your_lon);
			station.distance = Math.round(distance * 100) / 100;
		
			for (var k in stati.data.stations) {
				let stationStatus = stati.data.stations[k];
				
				if (station.station_id === stationStatus.station_id) station.status = stationStatus;
			}
		}
		
		return data;	
	}	
	
	const sortStationData = (data, sort_by) => {
		if (sort_by==="dock") {
			console.log("sort by available docks");			
			return data.sort(function (x, y) { return x.distance - y.distance; }).filter(item => item.status.num_docks_available > 1);
		} else {
			console.log("sort by available bicycles");
			return data.sort(function (x, y) { return x.distance - y.distance; }).filter(item => item.status.num_bikes_available > 1);
		}
	}
	
	//// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
	const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;		
	}
	
	const deg2rad = (deg) => {
		return deg * (Math.PI/180);
	}
	////
	
	const hideNotification = () => {
		let overlay = modalRef.current;
		overlay.hide();
	}
	
	const showNotification = (title, msg, spinner, buttons) => {
		let overlay = modalRef.current;

		overlay.title(title);
		overlay.spinner(spinner);
		overlay.content(msg);
		overlay.buttons(buttons);
		
		overlay.show();
	}	
	
	const getStations = async e => {
		let url =  process.env.REACT_APP_URL_ORIGO_OSLO_BYSYKKEL_STATION;	
		console.log(url);

		let identifier = process.env.REACT_APP_URL_ORIGO_OSLO_BYSYKKEL_IDENTIFIER;
		
		try {
			const response = await rqh.get(url, identifier);
			
			const data = await response.json();
		
			if (!response.ok) {
				let errorMsg = "Getting bike stations data failed: "+ response.statusText + " " + JSON.stringify(data);
				throw Error(errorMsg);
			}
			
			return data;

		} catch (error) {
			showNotification("Exception", error.toString(), false, [{caption: "Okay", onClick: hideNotification}]);
		}
	}
	
	const getStati = async e => {
		let url =  process.env.REACT_APP_URL_ORIGO_OSLO_BYSYKKEL_STATION_STATUS;	
		console.log(url);

		let identifier = process.env.REACT_APP_URL_ORIGO_OSLO_BYSYKKEL_IDENTIFIER;
		
		try {
			const response = await rqh.get(url, identifier);
			
			const data = await response.json();
		
			if (!response.ok) {
				let errorMsg = "Getting bike stations status data failed: "+ response.statusText + " " + JSON.stringify(data);
				throw Error(errorMsg);
			}
			
			return data;

		} catch (error) {
			showNotification("Exception", error.toString(), false, [{caption: "Okay", onClick: hideNotification}]);
		}
	}

	const clickedRow = (row) => {
		console.log(row);
		
		let url = "/station/" + row.station_id;

		navigation(url,{
			state:{
				station: row,
				station_id: row.station_id,
				name: row.name,
				address: row.address,
				distance: row.distance,
				num_bikes_available: row.status.num_bikes_available,
				num_docks_available: row.status.num_docks_available
				}
			});
	}
	
	const doShowAll = () => {
		console.log("doShowAll");
		setShowAll(!showAll);
		doRefresh();
	}
	
	const doRefresh = () => {
		console.log("doRefresh");
		setUpdated(false);
	}
	
	return (
	<>
		<Notification ref={modalRef} />
	
		<Navigation />

		<div className="spacer_100"></div>
		
		<Container className="px-0 margin_b_10">					
			<h2 className="actionbar_title">{mode === "dock" ? "Find a dock near you" : "Find a bike near you"}</h2>	
			<button className="btn btn-primary actionbar_btn float_r margin_l_5" onClick={doRefresh}>Refresh</button>
			<button className="btn btn-primary actionbar_btn float_r" onClick={doShowAll}>Show All</button>
		</Container>	

		<Container className="px-0 margin_b_10">
			<Alert color="primary">
  				{mode === "dock" ? "Showing you nearest top 5 with more than 1 dock free" : "Showing you nearest top 5 with more than 1 bike free"}
			</Alert>
		</Container>	

		<BikeList 
			listdata={displayData} 
			onclickfn={clickedRow}
		/>
		
	</>
	);
};

export default Bike;