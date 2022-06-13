import Movements from "./movement.js"
import Polygon from "./web3.js"
import abi from "./abi/abi.json" assert {type : "json"};



//To create scene object
const scene = new THREE.Scene();
scene.background = new THREE.Color("#212F3D")

//Create camera object
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

//Set width and height for render area
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// //Adding cube 
// const geometry = new THREE.BoxGeometry( 5,20, 7 );
// const material = new THREE.MeshPhongMaterial( { color: 0x0fff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// cube.position.set(-10,5 ,10);

//Adding ambient light in cube
const ambient_light = new THREE.AmbientLight(0xFDFEFE);
const direction_light = new THREE.DirectionalLight(0xFDFEFE,5);
ambient_light.add(direction_light);
scene.add(ambient_light);

//Render area
const geometry_area = new THREE.BoxGeometry( 100, 0.5, 70 )
const material_area = new THREE.MeshPhongMaterial( { color: 0xE5951A } );
const area = new THREE.Mesh( geometry_area , material_area );
scene.add( area );

// //Adding cylinder in area
// const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material_cylinder = new THREE.MeshLambertMaterial( {color: 0x1A32E5} );
// const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
// scene.add( cylinder );
// cylinder.position.set(20,10 ,20);


//camera.position.z = 5;
camera.position.set(10,20,50)
//To add animation 
function animate() {
    // cube.rotation.x += 0.04;
    // cube.rotation.y += 0.04;
    // cube.rotation.z += 0.04;

    // cylinder.rotation.x += 0.04;
    // cylinder.rotation.y += 0.04;
    // cylinder.rotation.z += 0.04;

    requestAnimationFrame( animate );


    //Key pressed movement 
    if (Movements.isPressed(37)){//LEFT
        camera.position.x -= 0.5;
    }
    if (Movements.isPressed(39)){//RIGHT
        camera.position.x += 0.5;
    }
    if (Movements.isPressed(38)){ //UP
        camera.position.y += 0.5;
        camera.position.x += 0.5;
    }
    if (Movements.isPressed(40)){ //DOWN
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }

	camera.lookAt(area.position)
    //using scene and camera we have render graphics on the web page
	renderer.render( scene, camera );
}
animate();
renderer.render( scene, camera );

//Sent data to contract

const button = document.querySelector('#mint')
button.addEventListener('click',minNFT)

function minNFT(){
    let _name = document.querySelector("#nft_name").value
    let _width = parseInt(document.querySelector("#nft_width").value)
    let _height = parseInt(document.querySelector("#nft_height").value)
    let _depth = parseInt( document.querySelector("#nft_depth").value)
    let _xAxis = parseInt(document.querySelector("#nft_x").value)
    let _yAxis = parseInt(document.querySelector("#nft_y").value)
    let _zAxis = parseInt(document.querySelector("#nft_z").value)
   console.log(_name,_width,_height,_depth,_xAxis,_yAxis,_zAxis)

    if(typeof window.ethereum == "undefined"){
        rej("You should install metamask")
    }

    //Create instance of Web3.
    let web3 = new Web3(window.ethereum)

    //create object of the contract 
    const contractAddress = "0xb885193ff6ba9af85b049eec236650dd8240b98c"
    const contract = new web3.eth.Contract(abi, contractAddress)

    web3.eth.requestAccounts().then((accounts)=>{

        contract.methods.mintNFT(_name,_width,_height,_depth,_xAxis,_yAxis,_zAxis).send({from:accounts[0],value:'10'}).then(
            console.log("NFT is minted")
        )
    })

}


//Draw NFT using date received from Contract
Polygon.then((result)=>{
    result.nft.forEach((object,index)=>{
        if(index <= result.supply){
            //Adding cube 
             const geometry = new THREE.BoxGeometry(object.width,object.height,object.depth );
             const material = new THREE.MeshPhongMaterial( { color: 0x0fff00 } );
             const nft = new THREE.Mesh( geometry, material );
             scene.add( nft );
             nft.position.set(object.xAxis,object.yAxis ,object.z);

            //Adding cylinder in area
               
        }

    })

})





