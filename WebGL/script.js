const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let camera, scene, renderer, controls;
let geometry, material, mesh;
let width;
let height;
let pxScale = window.devicePixelRatio;

function setup() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = width * pxScale;
    canvas.height = height * pxScale;

    context.scale(pxScale, pxScale);
  }
function random(min, max) {
    return min + Math.random() * (max + 1 - min);
}
function background() {
  const canvasSize = canvas.width * canvas.height;
  const starsFraction = canvasSize / 2000;
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // let data = imageData.data;
  for(let i = 0; i < starsFraction; i++) {
    //Set up random elements
    let xPos = random(2, canvas.width - 2);
    let yPos = random(2, canvas.height - 2);
    let alpha = random(0.5, 1);
    let size = random(1, 2);

    //Add stars
    context.fillStyle = '#ffffff';
    context.globalAlpha = alpha;
    context.fillRect(xPos, yPos, size, size);
  }
};
function init() {


    scene = new THREE.Scene();
    let width = window.innerWidth;
    let height = window.innerHeight;
  
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000); // FOV, aspect ration, near, far
    camera.position.set(0, 200, 700); // x, y (move up), back out on the z-axis
    scene.add(camera); // add camera to scene
  
    let light = new THREE.DirectionalLight(0xffffff, 1); // color, intensity
    light.position.set(1, 1, 1); // location on x, y, and z
    scene.add(light);
    let pointLight = new THREE.PointLight(0xff00ff, 1, 1000); // color, intensity, distance
    pointLight.position.set(-400, 400, 400);
    scene.add(pointLight);
    const loader = new THREE.GLTFLoader();
    loader.load('./ghost3.gltf', function(gltf) {
      gltf.scene.scale.set(100, 100, 100); 
      const root = gltf.scene;
      scene.add(root); 
        model = gltf.scene;
        scene.add(model);
        const ambientLight = new AmbientLight(0xFFFFFF);
        ambientLight.intensity = 1;
        scene.add( ambientLight );
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset;
        material = new  THREE.MeshStandardMaterial({metalness: 0.8});
        model.traverse(o => {
            if (o.isMesh) {o.material = material};
        });
      });
  
    renderer = new THREE.WebGLRenderer({alpha: 1, antialias: true});
    renderer.setSize(width, height);
    renderer.setClearColor( 0x000000, 0 );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
function animate() {
    requestAnimationFrame(animate);
    let date = new Date(); // get date string
    let timer = date.getTime() * 0.001; // get time string, multiplier changes speed
    camera.position.x = 800 * Math.cos(timer); // multiplier changes x coordinate
    camera.position.z = 800 * Math.sin(timer); // multiplier changes y coordinate
    renderer.render(scene, camera);
    controls.update();
  }



window.addEventListener('load', () => {
    setup(); 
    background();
    init();
    animate();
});

window.addEventListener('resize', () => {
    setup();
});