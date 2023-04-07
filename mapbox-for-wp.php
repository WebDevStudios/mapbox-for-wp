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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_mapbox_for_wp_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_mapbox_for_wp_block_init' );
