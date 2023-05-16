<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 16-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
    namespace WebDevStudios\MBWP\Composer\Installers;
    /**
     * Composer installer for 3rd party Tusk utilities
     * @author Drew Ewing <drew@phenocode.com>
     */
    class TuskInstaller extends BaseInstaller
    {
        protected $locations = array(
            'task'    => '.tusk/tasks/{$name}/',
            'command' => '.tusk/commands/{$name}/',
            'asset'   => 'assets/tusk/{$name}/',
        );
    }
