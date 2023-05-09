import { Container, Alert } from "reactstrap";

import Navigation from "./components/Navigation";

import tim from './img/tim.png';

import { Bicycle } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';

//some statics
const your_address = "Slotsplassen 1, 0010 Oslo";
const your_lat = 59.916590;
const your_lon = 10.729329;

const App = () => (
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
							<h1 className="txt_center">Need a ride? Get a bike!</h1>
						</div>
						
						<div className="tim_container txt_center">
							<img src={tim}  alt="logo" />
						</div>
				
						<div className="row p_20 txt_center">
				
							<div>
								<Alert color="info">
									Your Position is: {your_address} ({your_lat}, {your_lon})
								</Alert>
							</div>
				
							<div className="col-xl-6 col-md-6 mb-6">
								<a href="/find/?q=bike">
									<div className="column_wrapper">
										<div className="icon_container">
											<Bicycle className="icon"/> 
										</div>
										<div className="column_txt">
											I want to find a bike
										</div>
									</div>
								</a>
							</div>

							<div className="col-xl-6 col-md-6 mb-6">
								<a href="/find/?q=dock">
									<div className="column_wrapper">
										<div className="icon_container">
											<Key className="icon"/> 
										</div>
										<div className="column_txt">	
											I want to find a dock
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

export default App;