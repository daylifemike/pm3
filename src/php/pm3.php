<?php

/**
 * Plugin Name:       PM3
 * Plugin URI:        http://codecanyon.net/item/photomosaic-for-wordpress/243422?ref=makfak
 * Description:       Adds a new display type for your WordPress and NextGen galleries. See the settings page for examples and instructions.
 * Version:           3.0a
 * Author:            makfak
 * Author URI:        http://www.codecanyon.net/user/makfak?ref=makfak
 * Text Domain:       photomosaic
 * Domain Path:       /languages
 * IGNORE-ME-GitHub Plugin URI: daylifemike/pm3
 */

if ( ! defined( 'WPINC' ) ) { die; }

// function activate_plugin_name() {
//     require_once plugin_dir_path( __FILE__ ) . 'includes/class-photomosaic-activator.php';
//     Photomosaic_Activator::activate();
// }

// function deactivate_plugin_name() {
//     require_once plugin_dir_path( __FILE__ ) . 'includes/class-photomosaic-deactivator.php';
//     Photomosaic_Deactivator::deactivate();
// }

// register_activation_hook( __FILE__, 'activate_plugin_name' );
// register_deactivation_hook( __FILE__, 'deactivate_plugin_name' );

require plugin_dir_path( __FILE__ ) . 'src/php/includes/class-photomosaic3.php';

function run_photomosaic3_for_wordpress() {
    global $photomosaic3;
    $photomosaic3 = new Photomosaic3();
    $photomosaic3->run();
}
run_photomosaic3_for_wordpress();

// Template Tag
// function wp_photomosaic( $atts ){
//     global $photomosaic;

//     if (!is_admin()) {
//         echo $photomosaic->shortcode( $atts );
//     }
// }
