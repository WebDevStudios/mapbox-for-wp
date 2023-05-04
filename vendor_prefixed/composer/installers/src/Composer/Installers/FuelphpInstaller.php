<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 04-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace WebDevStudios\MBWP\Composer\Installers;

class FuelphpInstaller extends BaseInstaller
{
    protected $locations = array(
        'component'  => 'components/{$name}/',
    );
}
