<?php
/**
 * Plugin class factory.
 *
 * @package WebDevStudios\MB4WP
 */

namespace WebDevStudios\MB4WP;

class MB4WP_Factory {

	/**
	 * Create and return a shared instance of the MB4WP
	 * .
	 * @return MB4WP The shared plugin instance.
	 * @since  1.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public static function create(): MB4WP {

		/**
		 * The static instance to share, else null.
		 *
		 * @since 1.0.0
		 *
		 * @var null|MB4WP $plugin
		 */
		static $plugin = null;

		if ( null !== $plugin ) {
			return $plugin;
		}

		$plugin = new MB4WP();

		return $plugin;
	}
}
