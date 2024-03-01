import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { getISSPosition } from "/scripts/issPosition.js";

import { getCityPosition } from "/scripts/cityPosition.js";


let gData = [{
	lat: 0,
	lng: 0,
	alt: 0.3
  }];

export function initGlobe(world, zoom, startLat, startLng){
  
	// Gen random data


	const loader = new GLTFLoader();

	world.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
	world.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
	world.customLayerData(gData)


	loader.load('./ISS_stationary.glb', 
	function ( gltf ) {
		let ISS = gltf.scene.children[0]
		  
  
		ISS.scale.set(0.1,0.1,0.1,0.1)
		world.customThreeObject(ISS);
	}, 
		undefined, 
		function ( error ) {
		console.error( error );
	});


	world.customThreeObjectUpdate((obj, d) => {
		Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
	});

	const initISS = async () => {
		let pos = await getISSPosition()
		gData[0].lat = Number(pos.latitude);
		gData[0].lng = Number(pos.longitude);
		//console.log(gData[0].lat)
		world.pointOfView({startLat , startLng, altitude: zoom })

		world.customThreeObjectUpdate((obj, d) => {
			Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
		});
	}
	initISS()


	const updatePos = async () => {
		setInterval(async () => {
			let pos = await getISSPosition();
			gData[0].lat = Number(pos.latitude);
			gData[0].lng = Number(pos.longitude);
			//console.log(gData);
			world.customLayerData(world.customLayerData());
		}, 5000);


	}
	if (!window.updatePosCalled) {
		updatePos();
		window.updatePosCalled = true;
	}

}


let lData = [{
	lat: Number(0),
	lng: Number(0),
	text: "test",
	alt: 0.3
  }];


function addLabel(world, lat, lng, text){
	lData = [{
		lat: Number(lat),
		lng: Number(lng),
		text: text,
		alt: 0.3
	  }];
	

	world.labelsData(lData)
	world.labelLat(d => d.lat)
	world.labelLng(d => d.lng)

	world.labelText(d => d.text)
	world.labelSize(d => 2)
	world.labelDotRadius(d => 1.5)
	world.labelColor(() => 'rgba(255, 165, 0, 0.75)')

};

function connect(world, startLat, startLng, endLat, endLng){
   let arcData =  [{
	 startLat: startLat,
	 startLng: startLng,
	 endLat: endLat,
	 endLng: endLng,
	 color: "red"
   }];
   
    world.arcsData(arcData)
	world.arcColor('color')
	world.arcDashLength(() => Math.random())
	world.arcDashGap(() => Math.random())
	world.arcDashAnimateTime(() => 10000)
  (document.getElementById('globeViz'))
}




//let city = await getCityPosition()
//console.log(city)


//connect(world, gData[0].lat, gData[0].lng,lData[0].lat,lData[0].lng)

let options = {
	method: 'GET',
	url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
	params: {
	  address: 'Denver Colorado'
	},
	headers: {
	  'X-RapidAPI-Key': 'c9778a9535mshe39df3d0fa8ac57p104e5ejsn99e4077e9a6c',
	  'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
	}
  };
  
  async function findLocation(address){
	try {
		options.params.address = address;
		const response = await axios.request(options);
		return {lat:response.data.Results[0].longitude,lng:response.data.Results[0].latitude};
	} catch (error) {
		console.error(error);
	}
}


function zoomOut(world ,startingLat,startingLng){
	initGlobe(world, 4, startingLat, startingLng)
	let camera = world.camera()
	console.log(camera)
	camera.setViewOffset( 1000, 1000, 0, 0, 1000, 1000 );
}

function zoomIn(world){
	initGlobe(world, 1, 0, 0)

	let camera = world.camera()
	console.log(camera)
	camera.setViewOffset( 1000, 1000, 0, -700, 1000, 1000 );

}


const world = Globe()(document.getElementById('globeViz'))

//zoomIn(world)

//zoomOut(world ,gData[0].lat,gData[0].lng)

let address = "Denver Colorado"

let locObj = await findLocation(address)
addLabel(world,locObj.lng, locObj.lat, address)

