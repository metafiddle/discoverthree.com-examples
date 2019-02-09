function initScene() {

  const app = new THREE_APP( '#container' );

  const cameras = initCameras( app );

  app.init();

  initCameraControls( app, cameras.cameraMain, cameras.cameraOverview, cameras.cameraHelper );

  app.scene.background = new THREE.Color( 0x23485c );

  createLights( app.scene );
  createMeshes( app.scene );

  app.start();

}

initScene();
