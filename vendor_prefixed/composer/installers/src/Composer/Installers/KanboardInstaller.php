<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 16-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace WebDevStudios\MBWP\Composer\Installers;

/**
 *
 * Installer for kanboard plugins
 *
 * kanboard.net
 *
 * Class KanboardInstaller
 * @package Composer\Installers
 */
class KanboardInstaller extends BaseInstaller
{
    protected $locations = array(
        'plugin'  => 'plugins/{$name}/',
    );
}
