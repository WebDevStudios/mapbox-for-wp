<?php
/**
 * Plugin Name:       Mapbox For WP
 * Description:       Integrate your maps from Mapbox in to WordPress.
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Pluginize
 * Author URI:        https://pluginize.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mapbox-for-wp
 */

namespace WebDevStudios\MBWP;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'MBWP_VERSION', '1.0.0' );
define( 'MBWP_BASENAME', plugin_basename( __FILE__ ) );
define( 'MBWP_URL', plugin_dir_url( __FILE__ ) );
define( 'MBWP_PATH', plugin_dir_path( __FILE__ ) );
define( 'MBWP_FILE', __FILE__ );
define( 'MBWP_DIR', __DIR__ );

require_once 'vendor/autoload.php';

$mbwp = MBWP_Factory::create();
$mbwp->do_hooks();

function create_block_mapbox_for_wp_block_init() {
	register_block_type( __DIR__ . '/build/blocks/map' );
}
// add_action( 'init', __NAMESPACE__ . '\create_block_mapbox_for_wp_block_init' );

function render_mapbox($atts) {
    $atts = shortcode_atts(array(
        'zoom' => '0',
        'pitch' => '0',
        'bearing' => '0'
    ), $atts);

    $zoom = intval($atts['zoom']);
    $pitch = intval($atts['pitch']);
    $bearing = intval($atts['bearing']);

    ob_start();
    ?>
    <div id="mapbox-for-wp" data-zoom="<?php echo $zoom; ?>" data-pitch="<?php echo $pitch; ?>" data-bearing="<?php echo $bearing; ?>"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('mapbox_wp', __NAMESPACE__ . '\render_mapbox');

function enqueue_scripts(){
	wp_enqueue_style('mapbox_wp', plugin_dir_url( __FILE__ ) . '/build/map-core.css', [], rand());
    wp_register_script('mapbox_wp', plugin_dir_url( __FILE__ ) . '/build/map-core.js', ['wp-element'], rand(), true);

	wp_localize_script('mapbox_wp', 'mbwp_data', [
		'mapboxToken' => get_option('mbwp_public_token'),
		'mapboxStyle' => get_option('mbwp_default_style'),
	]);

	wp_enqueue_script('mapbox_wp');
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts');

function mbwp_enqueue_editor_assets() {
    wp_register_script( 'mapbox_wp', plugin_dir_url( __FILE__ ) . '/build/map-block.js', array( 'wp-blocks', 'wp-i18n', 'wp-element' ), '1.0.0', true );

	wp_localize_script( 'mapbox_wp', 'mbwp_data', array(
        'mapboxToken' => get_option('mbwp_public_token'),
		'mapboxStyle' => get_option('mbwp_default_style'),
    ) );

	wp_enqueue_script( 'mapbox_wp' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\mbwp_enqueue_editor_assets' );
