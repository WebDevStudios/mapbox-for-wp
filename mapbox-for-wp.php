<?php
/**
 * Plugin Name:       Mapbox For Wp
 * Description:       Integrate your maps from Mapbox in to WordPress.
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Version:           0.1.0
 * Author:            Pluginize
 * Author URI:        https://pluginize.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mapbox-for-wp
 */

namespace WebDevStudios\MB4WP;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'MB4WP_VERSION', '0.1.0' );
define( 'MB4WP_BASENAME', plugin_basename( __FILE__ ) );
define( 'MB4WP_URL', plugin_dir_url( __FILE__ ) );
define( 'MB4WP_PATH', plugin_dir_path( __FILE__ ) );
define( 'MB4WP_FILE', __FILE__ );
define( 'MB4WP_DIR', __DIR__ );

require_once 'vendor/autoload.php';

$mb4wp = MB4WP_Factory::create();
$mb4wp->do_hooks();

function create_block_mapbox_for_wp_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\create_block_mapbox_for_wp_block_init' );
