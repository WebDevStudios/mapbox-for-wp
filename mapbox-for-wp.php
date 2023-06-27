<?php
/**
 * Mapbox for WP
 *
 * @package Mapbox for WP
 * @since 1.0.0
 */

/**
 * Plugin Name:       Mapbox For WP
 * Description:       Integrate your maps from Mapbox into WordPress using a simple yet powerful Mapbox Block
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            Pluginize
 * Author URI:        https://pluginize.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mapbox-for-wp
 */

namespace WebDevStudios\MBWP;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MBWP_VERSION', '1.0.1' );
define( 'MBWP_BASENAME', plugin_basename( __FILE__ ) );
define( 'MBWP_URL', plugin_dir_url( __FILE__ ) );
define( 'MBWP_PATH', plugin_dir_path( __FILE__ ) );
define( 'MBWP_FILE', __FILE__ );
define( 'MBWP_DIR', __DIR__ );

require_once 'vendor/autoload.php';

$mbwp = MBWP_Factory::create();
$mbwp->do_hooks();

/**
 * Render our map div container with attributes.
 *
 * @since 1.0.0
 *
 * @param array $atts Array of block attributes.
 * @return false|string
 */
function render_callback( $atts ) {
	$longitude     = floatval( $atts['longitude'] );
	$latitude      = floatval( $atts['latitude'] );
	$zoom          = floatval( $atts['zoom'] );
	$pitch         = floatval( $atts['pitch'] );
	$bearing       = floatval( $atts['bearing'] );
	$style         = $atts['style'];
	$hide_controls = $atts['hideControls'];
	$static_map    = $atts['staticMap'];

	ob_start();
	?>
	<div id="mapbox-for-wp"
		data-longitude="<?php echo esc_attr( $longitude ); ?>"
		data-latitude="<?php echo esc_attr( $latitude ); ?>"
		data-zoom="<?php echo esc_attr( $zoom ); ?>"
		data-pitch="<?php echo esc_attr( $pitch ); ?>"
		data-bearing="<?php echo esc_attr( $bearing ); ?>"
		data-style="<?php echo esc_attr( $style ); ?>"
		data-hide-controls="<?php echo esc_attr( $hide_controls ); ?>"
		data-static-map="<?php echo esc_attr( $static_map ); ?>">
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Enqueue our assets.
 *
 * @since 1.0.0
 */
function enqueue_scripts() {
	$version = ( 'production' === wp_get_environment_type() ) ? MBWP_VERSION : wp_rand();
	wp_enqueue_style( 'mapbox_wp', plugin_dir_url( __FILE__ ) . 'build/map-core.css', [], $version );
	wp_register_script( 'mapbox_wp', plugin_dir_url( __FILE__ ) . 'build/map-core.js', [ 'wp-element' ], $version, true );

	wp_localize_script(
		'mapbox_wp',
		'mbwpData',
		[
			'mapboxToken'        => get_option( 'mbwp_public_token' ),
			'mapboxDefaultStyle' => get_option( 'mbwp_default_style' ),
		]
	);

	wp_enqueue_script( 'mapbox_wp' );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );

/**
 * Enqueue our editor assets.
 *
 * @since 1.0.0
 */
function mbwp_enqueue_editor_assets() {
	$version = ( 'production' === wp_get_environment_type() ) ? MBWP_VERSION : wp_rand();
	wp_enqueue_style( 'mapbox_wp', plugin_dir_url( __FILE__ ) . 'build/map-block.css', [], $version );
	wp_register_script( 'mapbox_wp', plugin_dir_url( __FILE__ ) . 'build/map-block.js', [ 'wp-blocks', 'wp-i18n', 'wp-element' ], $version, true );

	wp_localize_script(
		'mapbox_wp',
		'mbwpData',
		[
			'mapboxToken'        => get_option( 'mbwp_public_token' ),
			'mapboxDefaultStyle' => get_option( 'mbwp_default_style' ),
		]
	);

	wp_enqueue_script( 'mapbox_wp' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\mbwp_enqueue_editor_assets' );

/**
 * Register our block.
 *
 * @since 1.0.0
 */
function register_block() {
	register_block_type(
		'webdevstudios/mapbox-for-wp',
		[
			'editor_script'   => 'mapbox_wp',
			'editor_style'    => 'mapbox_wp',
			'style'           => 'mapbox_wp',
			'render_callback' => __NAMESPACE__ . '\render_callback',
			'attributes'      => [
				'longitude'    => [
					'type'    => 'number',
					'default' => 1,
				],
				'latitude'     => [
					'type'    => 'number',
					'default' => 1,
				],
				'zoom'         => [
					'type'    => 'number',
					'default' => 0,
				],
				'pitch'        => [
					'type'    => 'number',
					'default' => 0,
				],
				'bearing'      => [
					'type'    => 'number',
					'default' => 0,
				],
				'style'        => [
					'type'    => 'string',
					'default' => '',
				],
				'hideControls' => [
					'type'    => 'boolean',
					'default' => false,
				],
				'staticMap'    => [
					'type'    => 'boolean',
					'default' => false,
				],
			],
		]
	);
}
add_action( 'init', __NAMESPACE__ . '\register_block' );
