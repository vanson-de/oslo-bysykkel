import React from 'react';
import { ListGroup, ListGroupItem, Container, Form, Input } from 'reactstrap';

import { Bicycle } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';
import { GeoAltFill } from 'react-bootstrap-icons';

export default class BikeList extends React.Component {
	
	constructor(props) {
		super(props);
		
		let data = props.listdata;

		let onclickfn = props.onclickfn;

		this.state = { data, onclickfn, rowFilter: "" };

	}


	handleRowClick = (r) => {
		this.state.onclickfn(r);
	}
	
	render() {
		let filteredData = this.props.listdata;

		if (this.state.rowFilter) {
			console.log("rowFilter" + this.state.rowFilter);
			
			filteredData = this.props.listdata.filter(
				(dt) => dt.name.toLowerCase().includes(this.state.rowFilter.toLowerCase())
			);
		
		console.log(filteredData);
		}
		
		let list = filteredData.map(p =>{
			return (
				
				<ListGroupItem className="station_list_item list-group-item-action" key={p.name} onClick={() => this.handleRowClick(p)}>
					
					<div>
						<div className="margin_r_10 station_list_item_name">
							{p.name} 
						</div>
					
						<div className="margin_r_10 station_list_item_badge">
							<span className="badge bg-primary rounded-pill">></span>
						</div>
					
					</div>
					
					<div className="margin_r_10 station_info_item">
						<Bicycle className="icon_list"/> {p.status.num_bikes_available} 
					</div>
					<div className="margin_r_10 station_info_item">
						<Key className="icon_list"/> {p.status.num_docks_available} 
					</div>
					<div className="margin_r_10 station_info_item">
						<GeoAltFill className="icon_list"/> {p.distance}km 
					</div>
					
					

				</ListGroupItem>
				
			);
		});

		return (
			<>
			<Container className="px-0 margin_t_10 margin_b_10">
				<Form className="form-inline my-2 my-lg-0">
					<Input id="table_search" placeholder="search" type="text" value={this.state.rowFilter} onChange={(e) =>	this.setState({ rowFilter: e.target.value })} />
				</Form>
			</Container>
		
		
			<div className="container">
			
				<div className="row">
					<ListGroup className="list_group">
						{list}
					</ListGroup>					
				</div>
			</div>
			</>
		);					
	}
}
