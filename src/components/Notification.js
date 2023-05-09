import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

const Notification = forwardRef((props, ref) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	
	const [showSpinner, setShowSpinner] = useState(true);
	
	const [title, setTitle] = useState("Notification");
	const [content, setContent] = useState("Loading data for you");
	const [buttons, setButtons] = useState([]);
		
	useImperativeHandle(ref, () => ({
		show() {
			setModal(true);
		},
		hide() {
			setModal(false);
		},
		title(myTitle) {
			setTitle(myTitle);
		},
		content(myContent) {
			setContent(myContent);
		},
		spinner(bool) {
			setShowSpinner(bool);
		},
		buttons(buttonArr) {
			setButtons(buttonArr);
		}
	}));
	
	const createButtons = () => {
		let myButtons = [];
		
		for (var i=0;i<buttons.length;i++) {
			let cButton = buttons[i];
			let myKey = "notification_btn_"+i;
			let oneButton = <button key={myKey} className="btn btn-primary" onClick={cButton.onClick}>{cButton.caption}</button>
			
			myButtons.push(oneButton);
		}

		return myButtons;
		
	}
	
	let spinner = showSpinner ? <div className="txt_center"><Spinner color="primary" style={{height: '3rem', width: '3rem'}} >Loading...</Spinner></div> : "";

	let overlay_buttons = createButtons();

	return (

	<>
		<div key="notification_key">
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>{title}</ModalHeader>
		
				<ModalBody>
					{spinner}
					
					<div className="txt_center">
						<span>
							{content}
						</span>
					</div>
				</ModalBody>
		
				<ModalFooter>
					{overlay_buttons}
				</ModalFooter>
			</Modal>
		</div>
	</>
	);
});

export default Notification;

