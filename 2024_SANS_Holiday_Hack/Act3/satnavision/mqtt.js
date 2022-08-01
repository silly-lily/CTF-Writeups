http://34.29.105.184:8000/static/js/mqttJS.js
var connected_flag = 0
var mqtt;
var reconnectTimeout = 7000;
var stopic = "none";
var currentTopic = "none";
var currentMonitor = 1;
var currentImgMon = 1;
var currentImages = "";
var randImg = 1;
var prevImage = 0;
var monitorsOn = 0;
var imgsRetr = 0;
var userInit = "";
const myQuery = window.location.search;
const myParams = new URLSearchParams(myQuery);
const myId = myParams.get('id');
var playerAppend = "-" + myId

function onConnectionLost() {
	console.log("connection lost");
	document.getElementById("status").innerHTML = "Broadcast connections lost. Turning off monitors.";
	document.getElementById("messages").innerHTML = "Broadcast connections lost. Turning off monitors.";
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
	connected_flag = 0;
	currentMonitor = 1;
	currentImages = "";
	stopic = "";
	monitorsOn = 0;
	currentTopic = "none";
	currentMonitor = 1;
	userInit = "";
	document.getElementById("status").innerHTML = "Monitors off.";
	document.getElementById("messages").innerHTML = "";
	document.getElementById("connectas").value = "";
	document.getElementById("password").value = "";
	document.getElementById("camfeed").value = "";
	document.getElementById("camport").value = "";
	document.getElementById("cambank").value = "";
	connected_flag = 0
	document.getElementById('pubs').setAttribute("style", "display:none");
	for (let mImg = 1; mImg < 5; mImg++) {
		rImg = "img" + mImg;
		document.getElementById(rImg).setAttribute("src", "/static/images/monitoroff.png")
	}
}

function onFailure(message) {
	document.getElementById("messages").innerHTML = "Connection Failed";
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
}

function onMessageArrived(r_message) {
	var newImg = r_message.payloadString;
	var camBank = r_message.destinationName;
	var feedName = r_message.destinationName.split("-")[0];
	if (camBank == currentTopic) {
		var out_msg = ""
		document.getElementById("messages").innerHTML = out_msg;
		textarea = document.getElementById("messages");
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		document.getElementById("status").innerHTML = "Monitors on.<br>Currently receiving the <i>" + feedName + "</i> broadcast";
		var monitorImg = "img" + currentMonitor;
		try {
			if (newImg.includes(".png")) {
				out_msg = "(See monitors.)";
				document.getElementById("messages").innerHTML = out_msg;
				textarea = document.getElementById("messages");
				textarea.style.height = 'auto';
				textarea.style.height = `${textarea.scrollHeight}px`;
				currentImages = newImg
				const imgIntv = setInterval(ImgLoop, 2000)
				imgsRetr = 1;
			} else {
				document.getElementById(monitorImg).setAttribute("src", "/static/images/noimage.png")
				out_msg = out_msg + newImg;
				document.getElementById("messages").innerHTML = out_msg;
				textarea = document.getElementById("messages");
				textarea.style.height = 'auto';
				textarea.style.height = `${textarea.scrollHeight}px`;
				imgsRetr = 0;
			}
		} catch (error) {
			document.getElementById(monitorImg).setAttribute("src", "/static/images/noimage.png")
			out_msg = out_msg + "<br>No info.";
			document.getElementById("messages").innerHTML = out_msg;
			textarea = document.getElementById("messages");
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
			imgsRetr = 0;
		}
		currentMonitor = currentMonitor + 1;
		if (currentMonitor > 4) {
			currentMonitor = 1
		}
	}
}

function onConnected(recon, url) {
	console.log(" in onConnected " + reconn);
}

function onConnect() {
	document.getElementById("messages").innerHTML = "Monitors on. Connect to broadcast feed.";
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
	connected_flag = 1;
	monitorsOn = 1;
	imgsRetr = 0;
	document.getElementById("status").innerHTML = "Monitors on.";
	console.log("on Connect " + connected_flag);
	for (let mImg = 1; mImg < 5; mImg++) {
		rImg = "img" + mImg;
		document.getElementById(rImg).setAttribute("src", "/static/images/nofeed.png");
	}
	if (userInit == 'elfmonitor') {
		document.getElementById('pubs').setAttribute("style", "display:inline");
	}
}

function MQTTconnect() {
	document.getElementById("messages").innerHTML = "";
	var host = document.forms["connform"]["server"].value;
	var port = parseInt(document.forms["connform"]["port"].value); //9001
	userInit = document.forms["connform"]["username"].value;
	user = userInit + playerAppend;

	var pass = document.forms["connform"]["pwd"].value;
	if (host == "" || port == "" || user == "" || pass == "") {
		document.getElementById("messages").innerHTML = "Please provide missing values.";
		textarea = document.getElementById("messages");
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		return false;
	} else {
		clientConnect = "/mqtt?clientConnect=" + userInit;
		const connectResponse = fetch(clientConnect);
		var svclientId = userInit + "-ClientId" + playerAppend;
		console.log("connecting to " + host + " " + port);
		mqtt = new Paho.MQTT.Client(host, port, svclientId);
		var options = {
			invocationContext: { host: host, port: port, clientId: svclientId },
			userName: user,
			password: pass,
			timeout: 10,
			keepAliveInterval: 30,
			onSuccess: onConnect,
			onFailure: onFailure
		};
		mqtt.onConnectionLost = onConnectionLost;
		mqtt.onMessageArrived = onMessageArrived;
		mqtt.connect(options);
		return false;
	}
}

function sub_topics() {
	document.getElementById("messages").innerHTML = "";
	if (connected_flag == 0) {
		out_msg = "Power on monitors first!"
		document.getElementById("messages").innerHTML = out_msg;
		textarea = document.getElementById("messages");
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		return false;
	} else {
		var stopic = document.forms["subs"]["Stopic"].value;
		if (stopic == "") {
			document.getElementById("messages").innerHTML = "Please provide a broadcast feed."
			textarea = document.getElementById("messages");
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
			return false;
		} else {
			mqtt.unsubscribe(currentTopic);
			document.getElementById("status").innerHTML = "Monitors on. Awaiting messages (if available)...";
			for (let mImg = 1; mImg < 5; mImg++) {
				rImg = "img" + mImg;
				document.getElementById(rImg).setAttribute("src", "/static/images/nofeed.png")
				imgsRetr = 0;
			}
			stopic = stopic;
			mqtt.subscribe(stopic);
			currentTopic = stopic;
			currentMonitor = 1;
			return false;
		}
	}
}

async function listClients() {
	const lcResponse = await fetch("/listClients");
	const dataLC = await lcResponse.json();
	document.getElementById("messages").innerHTML = "Available clients: " + dataLC.clients
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
}

async function listRoles() {
	const lrResponse = await fetch("/listRoles");
	const dataLR = await lrResponse.json();
	document.getElementById("messages").innerHTML = "Available roles: " + dataLR.roles
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
}

function powerOff() {
	monitorsOn = 0;
	imgsRetr = 0;
	mqtt.unsubscribe(currentTopic);
	mqtt.disconnect();
	for (let mImg = 1; mImg < 5; mImg++) {
		setMon = rImg
		document.getElementById(rImg).setAttribute("src", "/static/images/monitoroff.png")
	}
	stopic = "";
	currentTopic = "none";
	currentMonitor = 1;
	document.getElementById('pubs').setAttribute("style", "display:none");
	document.getElementById("status").innerHTML = "Monitors off.";
	document.getElementById("messages").innerHTML = "";
	document.getElementById("connectas").value = "";
	document.getElementById("password").value = "";
	document.getElementById("camfeed").value = "";
	document.getElementById("camport").value = "";
	document.getElementById("cambank").value = "";
	connected_flag = 0;
	userInit = "";
}

function ImgLoop() {
	if (monitorsOn == 1) {
		if (imgsRetr == 1) {
			randImg = Math.floor(Math.random() * 8);
			if (randImg != prevImage) {
				newImage = currentImages.split(",");
				setMon = "img" + currentImgMon;
				document.getElementById(setMon).setAttribute("src", newImage[randImg]);
				currentImgMon = currentImgMon + 1;
				prevImage = randImg;
				if (currentImgMon > 4) {
					currentImgMon = 1;
				}
			}
		}
	}
}

function send_message() {
	document.getElementById("messages").innerHTML = "";
	if (connected_flag == 0) {
		out_msg = "<b>Not Connected; can't send</b>"
		console.log(out_msg);
		document.getElementById("messages").innerHTML = out_msg;
		textarea = document.getElementById("messages");
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
		return false;
	} else {
		var msg = document.forms["smessage"]["message"].value;
		var topic = document.forms["smessage"]["Ptopic"].value;
		pubFeed(topic, msg);
		return false;
	}
}

async function pubFeed(topic, msg) {
	pubFeedUrl = "/mqttPub?topic=" + topic + "&msg=" + msg
	const feedResponse = await fetch(pubFeedUrl);
	const dataFeed = await feedResponse.json();
	document.getElementById("messages").innerHTML = "Publish Result: " + dataFeed.message
	textarea = document.getElementById("messages");
	textarea.style.height = 'auto';
	textarea.style.height = `${textarea.scrollHeight}px`;
}