<?php
/**
 * Settings Class file
 *
 * @package WebDevStudios\MBWP
 * @since   1.0.0
 */

namespace WebDevStudios\MBWP\Admin;

/**
 * Class Settings
 *
 * @since 1.0.0
 */
class Settings {

	/**
	 * Settings slug.
	 *
	 * @var string
	 */
	private string $slug = 'mapbox-for-wp';

	/**
	 * Option group slug.
	 *
	 * @var string
	 */
	private string $option_group = 'mapbox-for-wp';

	/**
	 * Option group section.
	 *
	 * @var string
	 */
	private string $section = 'general';

	/**
	 * Minimum capability needed to interact with our options.
	 *
	 * @var string
	 */
	private string $capability = 'manage_options';

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {

	}

	/**
	 * Execute our hooks
	 * .
	 * @since 1.0.0
	 */
	public function do_hooks() {
		add_action( 'admin_menu', [ $this, 'add_page' ], 11 );
		add_action( 'admin_init', [ $this, 'add_settings' ] );
	}

	/**
	 * Add our menu.
	 *
	 * @since 1.0.0
	 */
	public function add_page() {
		add_menu_page(
			esc_html__( 'Mapbox for WP', 'mapbox-for-wp' ),
			esc_html__( 'Mapbox for WP', 'mapbox-for-wp' ),
			$this->capability,
			$this->slug,
			[ $this, 'display_page' ]
		);
	}

	/**
	 * Execute our settings sections.
	 *
	 * @since 1.0.0
	 */
	public function add_settings() {
		$this->add_section();
	}

	/**
	 * Register our section and related settings fields.
	 *
	 * @since 1.0.0
	 */
	private function add_section() {

	}

	/**
	 * Load an external PHP file to render our final settings page result.
	 *
	 * @since 1.0.0
	 */
	public function display_page() {
		require_once MBWP_PATH . 'includes/admin/partials/settings.php';
	}
}
