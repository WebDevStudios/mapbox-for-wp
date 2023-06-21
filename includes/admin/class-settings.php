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
	 * Array of our available options.
	 *
	 * @var array
	 */
	private array $options;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_option( 'mbwp_public_token' );
		add_option( 'mbwp_default_style' );

		$this->options = $this->set_options();
	}

	/**
	 * Execute our hooks.
	 *
	 * @since 1.0.0
	 */
	public function do_hooks() {
		add_action( 'admin_menu', [ $this, 'add_page' ] );
		add_action( 'admin_init', [ $this, 'add_settings' ] );
		add_action( 'admin_notices', [ $this, 'settings_saved' ] );
	}

	/**
	 * Fetch and assign our options property for easy access.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	private function set_options(): array {
		return [
			'public_token'  => get_option( 'mbwp_public_token' ),
			'default_style' => get_option( 'mbwp_default_style' ),
		];
	}

	/**
	 * Add our menu.
	 *
	 * @since 1.0.0
	 */
	public function add_page() {
		add_menu_page(
			esc_html__( 'Mapbox for WP Settings', 'mapbox-for-wp' ),
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
		add_settings_section(
			$this->section,
			esc_html__( 'General', 'mapbox-for-wp' ),
			[ $this, 'settings_callback' ],
			$this->slug
		);

		/*
		 * Mapbox Public Token
		 */
		add_settings_field(
			'mbwp_public_token',
			esc_html__( 'Public Token', 'mapbox-for-wp' ),
			[ $this, 'render_text' ],
			$this->slug,
			$this->section,
			[
				'label_for' => 'mbwp_public_token',
				'value'     => $this->options['public_token'],
				'classes'   => 'regular-text',
			]
		);

		register_setting(
			$this->option_group,
			'mbwp_public_token',
			[
				'sanitize_callback' => 'sanitize_text_field',
			]
		);

		/*
		 * Default style (provided by Mapbox).
		 */
		add_settings_field(
			'mbwp_default_style',
			esc_html__( 'Default style', 'mapbox-for-wp' ),
			[ $this, 'render_dropdown' ],
			$this->slug,
			$this->section,
			[
				'label_for'   => 'mbwp_default_style',
				'value'       => $this->options['default_style'],
				'styles'      => $this->get_styles(),
				'extra_label' => esc_html__( 'Options come from Mapbox available defaults.', 'mapbox-for-wp' ),
			]
		);

		register_setting(
			$this->option_group,
			'mbwp_default_style',
			[
				'sanitize_callback' => 'sanitize_text_field',
			]
		);
	}

	/**
	 * Helper method to render a text field setting.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args array of extra arguments.
	 */
	public function render_text( array $args ) {
		?>
		<label for="<?php echo esc_attr( $args['label_for'] ); ?>">
			<input class="<?php echo esc_attr( $args['classes'] ); ?>" type="text" id="<?php echo esc_attr( $args['label_for'] ); ?>" name="<?php echo esc_attr( $args['label_for'] ); ?>" value="<?php echo esc_attr( $args['value'] ); ?>"/>
		</label>

		<?php
	}

	/**
	 * Helper method to render a dropdown field setting.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args array of extra arguments.
	 */
	public function render_dropdown( array $args ) {
		$extra_label = ! empty( $args['extra_label'] ) ? $args['extra_label'] : '';
		?>
		<label for="<?php echo esc_attr( $args['label_for'] ); ?>">
			<select name="<?php echo esc_attr( $args['label_for'] ); ?>" id="<?php echo esc_attr( $args['label_for'] ); ?>">
				<?php
				foreach ( $args['styles'] as $value => $name ) {
					printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $value ),
						selected( $this->options['default_style'], $value, false ),
						esc_html( $name )
					);
				}
				?>
			</select>
		</label>
		<p class="description"><?php echo esc_html( $extra_label ); ?></p>
		<?php
	}

	/**
	 * Callback to use with the settings section.
	 *
	 * @since 1.0.0
	 */
	public function settings_callback() {
		?>
			<p>
			<?php
				printf(
					// translators: Placeholder is for html link after escaping.
					esc_html__( 'Visit the %s to retrieve your public token. ', 'mapbox-for-wp' ),
					sprintf(
						'<a href="%s" target="_blank" rel="noopener">%s<span style="font-size: 16px;" class="dashicons dashicons-external"></span></a>',
						esc_url( 'https://account.mapbox.com/access-tokens/' ),
						esc_html__( 'Mapbox dashboard', 'mapbox-for-wp' )
					)
				);
				printf(
					// translators: Placeholder is for html link after escaping.
					esc_html__( 'Additional information can be found at %s', 'mapbox-for-wp' ),
					sprintf(
						'<a href="%s" target="_blank" rel="noopener">%s<span style="font-size: 16px;" class="dashicons dashicons-external"></span></a>',
						esc_url( 'https://docs.mapbox.com/api/maps/styles/' ),
						esc_html__( 'Mapbox Styles API', 'mapbox-for-wp' )
					)
				);

			?>
			</p>
		<?php
	}

	/**
	 * Load an external PHP file to render our final settings page result.
	 *
	 * @since 1.0.0
	 */
	public function display_page() {
		require_once MBWP_PATH . 'includes/admin/partials/settings.php';
	}

	/**
	 * Return an array of styles for our default style dropdown option.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	private function get_styles(): array {
		$options = [
			'mapbox://styles/mapbox/streets-v12'           => esc_html__( 'Mapbox Streets', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/outdoors-v12'          => esc_html__( 'Mapbox Outdoors', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/light-v11'             => esc_html__( 'Mapbox Light', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/dark-v11'              => esc_html__( 'Mapbox Dark', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/satellite-v9'          => esc_html__( 'Mapbox Satellite', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/satellite-streets-v12' => esc_html__( 'Mapbox Satellite Streets', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/navigation-day-v1'     => esc_html__( 'Mapbox Navigation Day', 'mapbox-for-wp' ),
			'mapbox://styles/mapbox/navigation-night-v1'   => esc_html__( 'Mapbox Navigation Night', 'mapbox-for-wp' ),
		];
		return (array) apply_filters( 'mbwp_styles_options', $options );
	}

	/**
	 * Saved settings admin notice.
	 *
	 * @since 1.0.1
	 */
	public function settings_saved() {
		if ( empty( $_REQUEST ) ) {
			return;
		}

		if (
			isset( $_REQUEST['page'] ) &&
			'mapbox-for-wp' === $_REQUEST['page'] &&
			isset( $_REQUEST['settings-updated'] ) &&
			'true' === $_REQUEST['settings-updated']
		) {
			?>
			<div id="mapbox-for-wp-settings-saved" class="notice notice-success is-dismissible">
				<p><?php esc_html_e( 'Settings saved', 'mapbox-for-wp' ); ?></p>
			</div>
		<?php
		}
	}
}
