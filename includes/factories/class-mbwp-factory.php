<?php
/**
 * Plugin class factory.
 *
 * @package WebDevStudios\MBWP
 */

namespace WebDevStudios\MBWP;

/**
 * MBWP_Factory class
 *
 * @since 1.0.0
 */
class MBWP_Factory {

	/**
	 * Create and return a shared instance of the MBWP.
	 *
	 * @since 1.0.0
	 *
	 * @return MBWP The shared plugin instance.
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
