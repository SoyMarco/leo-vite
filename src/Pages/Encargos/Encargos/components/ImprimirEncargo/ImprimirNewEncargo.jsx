/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import "moment/dist/locale/es-us";
import { Modal, Row, Divider, Button } from "antd";
import "./imprimir.css";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { keyBlock } from "Utils";
import { openNotification } from "Utils/openNotification";

const ImprimirNewEncargo = ({
	imprimir,
	abono,
	auth,
	cliente,
	listaProductos,
	setimprimir,
	dinero,
	cambio,
}) => {
	const [numPrint, setnumPrint] = useState(0);
	const imprimirNewEncargo = useRef();
	const inputReprint = useRef();
	let navigate = useNavigate();

	useEffect(() => {
		if (imprimir === true) {
			document.getElementById("print-button").click();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imprimir]);

	const afterPrint = () => {
		openNotification("success", "Encargo guardado con exito");
		if (numPrint === 0) {
			inputReprint.current.select();
			setnumPrint(numPrint + 1);
		} else if (numPrint === 1) {
			navigate("/");
		}
	};
	const pressKeyPrecio = (e) => {
		// Enter
		if (e.keyCode === 13) {
			document.getElementById("print-button").click();
		}
		// 	F1
		if (e.keyCode === 112) {
			document.getElementById("print-button").click();
		}
	};
	const pasarAFechaLL = (item) => {
		let fecha = moment.unix(item / 1000).format("LL");
		return fecha;
	};
	const pasarAFechaLTS = (item) => {
		let fecha = moment.unix(item / 1000).format("LTS");
		return fecha;
	};
	const pasarAFechaCorta = (item) => {
		let fecha = moment.unix(item / 1000).format("ll");
		return fecha;
	};
	return (
		<>
			<ReactToPrint
				trigger={(e) => <button id='print-button'>Imprimiendo...</button>}
				content={() => imprimirNewEncargo.current}
				// onBeforePrint={() => antesDeImprimir()}
				onAfterPrint={() => afterPrint()}
			/>

			<Modal visible={imprimir} width='229px' onCancel={() => navigate("/")}>
				{/* <input ref={inputReprint} onKeyUp={pressKeyPrecio}></input> */}
				<input
					id='inputPrincipalPrintESC'
					ref={inputReprint}
					onKeyUp={pressKeyPrecio}
					onKeyDown={keyBlock}
					style={{ width: "180px", marginBottom: 10 }}
				></input>
				<Row justify='space-around'>
					<Button
						type='primary'
						danger
						shape='round'
						onClick={() => navigate("/")}
					>
						ESC
					</Button>

					<Button
						type='primary'
						shape='round'
						onClick={() => document.getElementById("print-button").click()}
					>
						Print(Enter)
					</Button>
				</Row>
				<Divider />
				<div
					id='tickets'
					className='ticket'
					name='tickets'
					ref={imprimirNewEncargo}
				>
					{/*  LOGO LEO  */}
					<img src='data:image/png;base64,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' />
					{/* <!-- FECHA --> */}
					<Row justify='space-around' style={{ width: "190px" }}>
						<span
							style={{
								paddingLeft: "0px",
								textAlignLast: "center",
								// width: "190px",
							}}
						>
							ROPA Y ACCESORIOS LEO
						</span>
					</Row>
					<h3 className='tituloTicketEncargo'>ENCARGO</h3>

					{/* 	<!-- NOMBRE CLIENTE--> */}
					<Row
						style={{
							padding: "0px",
							background: "black",
							marginBottom: "5px",
							justifyContent: "center",
							width: "190px",
						}}
					>
						<h2
							style={{
								background: "black",
								color: "white",
								textAlign: "center",

								fontWeight: "bold",
							}}
						>
							{cliente}
						</h2>
					</Row>

					{/* <!-- TABLA DE PRODUCTOS --> */}
					<h3 className='subtituloTicketEncargo'>
						<u> Encargo: </u>
					</h3>
					{listaProductos?.map((item) => {
						return (
							<table key='item.id' className='productosEncargo'>
								<tr>
									<td>{item.cantidad}</td>
									<td>
										<h3 className={"finalTicket"}>
											{item?.nombre?.toUpperCase()}
										</h3>
									</td>
								</tr>
							</table>
						);
					})}

					{/* <!-- FIN TABLA DE PRODUCTOS --> */}
					{
						/* <!-- TABLA DE ABONOS --> */
						abono > 0 ? (
							<>
								<h3 className='subtituloTicketEncargo'>
									<u>ABONOS</u>
								</h3>
								<table key='item._id' className='productosEncargo'>
									<tr>
										<td style={{ padding: "0px" }}>
											{pasarAFechaCorta(Date.now())}
										</td>
										<td>
											<h3 className={"finalTicket"}>${abono}</h3>
										</td>
									</tr>
								</table>
								<h3 className='sumaTabla'>Abonos: ${abono}</h3>{" "}
							</>
						) : null
					}
					{/* <!-- FIN TABLA DE ABONOS --> */}

					{/* <!-- VENDEDOR --> */}
					{/* <span>Reimpresi??n</span> */}
					<br></br>
					<span>{`Vendedor: ${auth.name.toUpperCase()}`}</span>
					<br></br>
					<span>
						{pasarAFechaLTS(Date.now())} <br />
					</span>
					<span>
						{pasarAFechaLL(Date.now())} <br />
					</span>
				</div>
			</Modal>
		</>
	);
};
export default ImprimirNewEncargo;
