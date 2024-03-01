import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { getISSPosition } from "/scripts/issPosition.js";


export function initGlobe(){
  
	// Gen random data
	const gData = [{
	  lat: 0,
	  lng: 0,
	  alt: 0.1
	}];

	const loader = new GLTFLoader();

	const world = Globe()(document.getElementById('globeViz'))
	world.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
	world.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
	world.pointOfView({lat:0 , lng:0, altitude: 3.5 })
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
	const updatePos = async () => {
		setInterval(async () => {
		let pos = await getISSPosition()
		gData[0].lat = Number(pos.latitude);
		gData[0].lng = Number(pos.longitude);
		console.log(gData)
		world.customLayerData(world.customLayerData());
		requestAnimationFrame(updatePos);
		}, 10000);
	}
	updatePos()

}


initGlobe()
