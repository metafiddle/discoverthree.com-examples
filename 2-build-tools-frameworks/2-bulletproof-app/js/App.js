class THREE_APP {

  constructor( container ) {

    container = container || '#container'; // default ID if none provided

    this.container = document.querySelector( container );

    if ( !this.container ) {

      console.error( `Couldn't find the container element: ${container}` );

      return;

    }

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.running = false;

    // make sure to set these to the values you want before calling init
    // since they can't be changed without creating a new WebGLRenderer
    this.alpha = false;
    this.antialias = true;
    this.powerPreference = 'high-performance';
    this.stencil = false;

    // should nearly always be true, unless using postprocessing
    this.gammaOutput = true;

    // this also needs to be set before calling init()
    this.autoResize = true;

    // set this to a value less than 3 to increase performance on low power mobile devices with high pixel ratio
    this.maxPixelRatio = Infinity;

    // whether or not to call the controls.update function once per frame
    this.controlsAutoUpdate = true;

    this.onUpdate = null;
    this.onResize = null;

    this.showStats = false;

  }

  init() {

    this.initCamera();
    this.initControls();
    this.initRenderer();

    this.initStats();

    if ( this.autoResize ) window.addEventListener( 'resize', () => this.onWindowResize() );

  }

  initCamera() {

    if ( !this.camera ) this.camera = new THREE.PerspectiveCamera( 35, this.container.clientWidth / this.container.clientHeight, 1, 1000 );

  }

  initControls() {

    // allow custom controls to be set up
    if ( this.controls ) return;

    // if the controls script was loaded, we'll set them up
    if ( typeof THREE.OrbitControls === 'function' ) this.controls = new THREE.OrbitControls( this.camera, this.container );

    // otherwise we'll skip them
    else return;

    // gives the controls a feeling of "weight"
    this.controls.enableDamping = true;

  }

  initRenderer() {

    // allow custom renderer to be set up
    if ( this.renderer ) return;

    this.renderer = new THREE.WebGLRenderer( {
      powerPreference: this.powerPreference,
      alpha: this.alpha,
      antialias: this.antialias,
      stencil: this.stencil,
    } );

    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, this.maxPixelRatio ) );

    this.renderer.gammaOutput = this.gammaOutput;

    // to avoid page pulling
    this.renderer.domElement.addEventListener( 'touchstart', e => e.preventDefault() );

    this.container.appendChild( this.renderer.domElement );

  }

  render() {

    this.renderer.render( this.scene, this.camera );

  }

  update() {

    const delta = this.clock.getDelta();

    if ( this.controlsAutoUpdate && this.controls && this.controls.update ) this.controls.update( delta );

    // step through the scene and call custom onUpdate functions on any object
    // for which we have defined them
    this.scene.traverse( ( child ) => {

      if ( child.userData.onUpdate ) child.userData.onUpdate( delta );

    } );

    if ( this.onUpdate ) this.onUpdate( delta );

  }

  start() {

    // clear previous delta to prevent large delta values when
    // starting and stopping the app
    this.clock.getDelta();

    this.renderer.setAnimationLoop( () => {

      if ( this.stats ) this.stats.begin();

      this.update();
      this.render();

      if ( this.stats ) this.stats.end();

    } );

    this.running = true;

  }

  stop() {

    this.renderer.setAnimationLoop( null );

    this.running = false;

  }

  onWindowResize() {

    if ( !this.autoResize ) return;

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, this.maxPixelRatio ) );

    // render an extra frame to prevent jank
    this.renderer.render( this.scene, this.camera );

    if ( this.onResize ) this.onResize();

  }

  // if stats.js has been loaded, create a stats overlay
  initStats() {

    if ( !this.showStats || !Stats ) return;

    this.stats = new Stats();

    this.container.appendChild( this.stats.dom );

  }

}