<?php

namespace WebDevStudios\MB4WP;

use WebDevStudios\MB4WP\Admin\Settings;

/**
 * Class MB4WP
 *
 * @since 1.0.0
 */
final class MB4WP {

	/**
	 * Settings instance.
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * Executes our hooks to wire everything up.
	 *
	 * @since 1.0.0
	 */
	public function do_hooks() {

		add_action( 'init', [ $this, 'load_classes' ] );

		do_action( 'mb4wp_loaded' );
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
