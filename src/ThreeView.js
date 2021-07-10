import React from 'react';
import * as THREE  from 'three';


export class ThreeView extends React.Component{
	componentDidMount(){
		this.setUpScene();
		this.animate();
	}

	setUpScene(){
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xffffff);
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.shadowMap.enabled=true;
	
		this.scene.add(new THREE.AmbientLight(0xffffff));

	
		this.spotLight = new THREE.SpotLight(0xffffff);
		this.spotLight.angle =Math.PI/5 ;
		this.spotLight.position.set(2,3,3);
		this.spotLight.castShadow = true;
		this.spotLight.shadow.camera.near = 2;
		this.spotLight.shadow.camera.far= 200;
		this.spotLight.shadow.mapSize.width = 256;
		this.spotLight.shadow.mapSize.height = 256;
		this.spotLight.shadow.bias = -.002;
		this.spotLight.shadow.radius = 4;
		//this.scene.add(this.spotLight);
		
		

		this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
		this.dirLight.position.set(0,4,3);
		this.dirLight.castShadow = true;
		this.dirLight.shadow.camera.near = .1;
		this.dirLight.shadow.camera.far = 500;
		this.dirLight.shadow.camera.right  = 17;
		this.dirLight.shadow.camera.left = -17; 
		this.dirLight.shadow.camera.top = 17;
		this.dirLight.shadow.camera.bottom = -17; 
		this.dirLight.shadow.mapSize.width = 512;
		this.dirLight.shadow.mapSize.height = 512; 
		this.dirLight.shadow.radius = 10;
		this.dirLight.shadow.bias = -.0005;
		this.scene.add(this.dirLight);


		this.ground = new THREE.Mesh(new THREE.PlaneGeometry(50,50), new THREE.MeshPhongMaterial({color:0xffffff}));
		this.ground.rotation.x = -Math.PI/3;
		this.ground.position.z = -15;
		this.ground.scale.multiplyScalar(3);
		this.ground.castShadow = true;
		this.ground.receiveShadow  = true;
		this.scene.add(this.ground)



		//var size = parseInt(this.props.size)	
		this.material = new THREE.MeshLambertMaterial({color:0xef6101});
		this.shape= new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), this.material);
		this.shape.castShadow = true;
		this.shape.applyMatrix4(new THREE.Matrix4().makeScale(1.7, 1.2, 1.5));
		this.camera.position.set(-1,-1,7);
		this.renderer.setSize(window.innerWidth*.8, window.innerHeight*.8);
		document.getElementsByClassName("three")[0].appendChild(this.renderer.domElement);

		this.scene.add(this.shape);

		this.render(this.scene, this.camera);

	}


	animate(){
		this.renderer.render(this.scene, this.camera);
	
	}

		



	render(){
		return(
			<div />
		)
	}



}

export default ThreeView;
