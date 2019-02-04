function init() {

  const app = new THREE_APP( '#container' );

  app.init();

  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( -1, 1, 4 );

  initLights( app.scene );
  initMeshes( app.scene );

  app.start();

}

init();