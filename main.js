import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';




export function test(lat,lng){
  
	// Gen random data
	const gData = [{
	  lat: lat,
	  lng: lng,
	  alt: 0.5,
	  radius: 4,
	  color: 'grey'}];

	const loader = new GLTFLoader();

	const world = Globe()(document.getElementById('globeViz'))
	world.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
	world.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
	world.pointOfView({lat:0 , lng:0, altitude: 3.5 })
	world.customLayerData(gData)

	world.customThreeObjectUpdate((obj, d) => {
		Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
	});

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
	
	
}
test(9,8)