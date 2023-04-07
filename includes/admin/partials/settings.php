<?php
/**
 * Settings Page.
 *
 * @package WebDevStudios\MB4WP
 * @since   1.0.0
 */

?>

<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<h2>Hi Brad and Scott</h2>
	<form method="post" action="options.php">
		<?php
		settings_fields( $this->option_group );
		do_settings_sections( $this->slug );
		submit_button();
		?>
	</form>
</div>
