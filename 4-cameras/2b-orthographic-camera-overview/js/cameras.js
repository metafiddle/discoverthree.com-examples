import {
  OrthographicCamera,
  PerspectiveCamera,
} from './vendor/three/three.module.js';

function createMainCamera() {

  const container = document.querySelector( '#scene-container' );

  const width = container.clientWidth;
  const height = container.clientHeight;

  const mainCamera = new OrthographicCamera( -width / 2, width / 2, height / 2, -height / 2, 20, 50 );

  // position the camera
  // remember that it doesn't matter how far away we
  // put the camera, so long as the objects fall inside the
  // frustum they will remain the same size.
  mainCamera.position.z = 30;

  // instead, we can use camera.zoom to fine tune our view of the scene
  mainCamera.zoom = 30;
  mainCamera.updateProjectionMatrix();

  return mainCamera;

}

function createOverViewCamera() {

  const container = document.querySelector( '#scene-container' );

  const overviewCamera = new PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 1000 );
  overviewCamera.position.set( 50, 50, 100 );
  overviewCamera.lookAt( 0, 0, 0 );
  overviewCamera.far = 1000;
  overviewCamera.updateProjectionMatrix();

  return overviewCamera;

}


export default function setupCameras() {

  const mainCamera = createMainCamera();

  return {

    main: mainCamera,
    overview: createOverViewCamera(),

  };

}
