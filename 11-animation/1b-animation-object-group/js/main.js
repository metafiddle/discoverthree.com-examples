function initScene() {

  const app = new THREE_APP( '#container' );

  app.init();

  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( 15, 15, 15 );

  createLights( app.scene );

  const meshes = createMeshes( app.scene );

  initAnimation( meshes );

  app.start();

}

initScene();
