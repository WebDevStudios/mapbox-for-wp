<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 16-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace WebDevStudios\MBWP\Composer\Installers;

class CiviCrmInstaller extends BaseInstaller
{
    protected $locations = array(
        'ext'    => 'ext/{$name}/'
    );
}
