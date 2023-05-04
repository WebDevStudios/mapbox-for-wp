<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 04-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace WebDevStudios\MBWP\Composer\Installers;

class TheliaInstaller extends BaseInstaller
{
    protected $locations = array(
        'module'                => 'local/modules/{$name}/',
        'frontoffice-template'  => 'templates/frontOffice/{$name}/',
        'backoffice-template'   => 'templates/backOffice/{$name}/',
        'email-template'        => 'templates/email/{$name}/',
    );
}
