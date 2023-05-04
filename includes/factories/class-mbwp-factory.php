<?php
/**
 * Plugin class factory.
 *
 * @package WebDevStudios\MBWP
 */

namespace WebDevStudios\MBWP;

class MBWP_Factory {

	/**
	 * Create and return a shared instance of the MBWP.
	 *
	 *
	 * @return MBWP The shared plugin instance.
	 * @since  1.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public static function create(): MBWP {

		/**
		 * The static instance to share, else null.
		 *
		 * @since 1.0.0
		 *
		 * @var null|MBWP $plugin
		 */
		static $plugin = null;

		if ( null !== $plugin ) {
			return $plugin;
		}

		$plugin = new MBWP();

		return $plugin;
	}
}
