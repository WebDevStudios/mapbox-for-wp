<?php
/**
 * Main class file.
 *
 * @package WebDevStudios\MBWP
 * @since   1.0.0
 */

namespace WebDevStudios\MBWP;

use WebDevStudios\MBWP\Admin\Settings;

/**
 * Class MBWP
 *
 * @since 1.0.0
 */
final class MBWP {

	/**
	 * Settings instance.
	 *
	 * @var Settings
	 */
	private Settings $settings;

	/**
	 * Executes our hooks to wire everything up.
	 *
	 * @since 1.0.0
	 */
	public function do_hooks() {

		add_action( 'init', [ $this, 'load_classes' ] );

		do_action( 'mbwp_loaded' );
	}

	/**
	 * Load all of our classes.
	 *
	 * @since 1.0.0
	 */
	public function load_classes() {
		$this->settings = new Settings();
		$this->settings->do_hooks();
	}
}
