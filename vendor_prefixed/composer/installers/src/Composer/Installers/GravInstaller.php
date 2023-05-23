<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 16-May-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace WebDevStudios\MBWP\Composer\Installers;

class GravInstaller extends BaseInstaller
{
    protected $locations = array(
        'plugin' => 'user/plugins/{$name}/',
        'theme'  => 'user/themes/{$name}/',
    );

    /**
     * Format package name
     *
     * @param array $vars
     *
     * @return array
     */
    public function inflectPackageVars($vars)
    {
        $restrictedWords = implode('|', array_keys($this->locations));

        $vars['name'] = strtolower($vars['name']);
        $vars['name'] = preg_replace('/^(?:grav-)?(?:(?:'.$restrictedWords.')-)?(.*?)(?:-(?:'.$restrictedWords.'))?$/ui',
            '$1',
            $vars['name']
        );

        return $vars;
    }
}
