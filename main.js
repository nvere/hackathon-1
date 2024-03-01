import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { getISSPosition } from "/scripts/issPosition.js";


export function initGlobe(world){
  
	// Gen random data
	const gData = [{
	  lat: 0,
	  lng: 0,
	  alt: 0.3
	}];

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
		world.pointOfView({lat:gData[0].lat , lng:gData[0].lng, altitude: 4 })

		world.customThreeObjectUpdate((obj, d) => {
			Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
		});
	}
	initISS()


	const updatePos = async () => {
		setInterval(async () => {
		let pos = await getISSPosition()
		gData[0].lat = Number(pos.latitude);
		gData[0].lng = Number(pos.longitude);
		world.customLayerData(world.customLayerData());
		requestAnimationFrame(updatePos);
		}, 10000);
	}
	updatePos()

}

function addLabel(world, lat, lng, text){
	const lData = [{
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
	world.labelResolution(2)
  (document.getElementById('globeViz'))
};
	  

const world = Globe()(document.getElementById('globeViz'))

initGlobe(world)
addLabel(world, 0, 0, "test")
