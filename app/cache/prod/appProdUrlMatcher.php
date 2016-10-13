<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appProdUrlMatcher.
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appProdUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = rawurldecode($pathinfo);
        $context = $this->context;
        $request = $this->request;

        // ajax
        if (0 === strpos($pathinfo, '/ajax') && preg_match('#^/ajax/(?P<controller>[^/]++)/(?P<action>[^/]++)$#s', $pathinfo, $matches)) {
            if ($this->context->getMethod() != 'POST') {
                $allow[] = 'POST';
                goto not_ajax;
            }

            return $this->mergeDefaults(array_replace($matches, array('_route' => 'ajax')), array (  '_controller' => 'Koolawa\\AjaxBundle\\Controller\\AjaxController::runAction',  '_format' => 'json',));
        }
        not_ajax:

        // login
        if (preg_match('#^/(?P<_locale>en|fr|de|it)?(?:/(?P<_workspace>[^/]++))?$#s', $pathinfo, $matches)) {
            return $this->mergeDefaults(array_replace($matches, array('_route' => 'login')), array (  '_controller' => 'Koolawa\\AppsBundle\\Controller\\SecurityController::loginAction',  '_locale' => 'fr',  '_workspace' => 'home',));
        }

        // login_check
        if ($pathinfo === '/login_check') {
            return array('_route' => 'login_check');
        }

        // login_check_locale
        if (preg_match('#^/(?P<_locale>en|fr|de|it)/login_check$#s', $pathinfo, $matches)) {
            return $this->mergeDefaults(array_replace($matches, array('_route' => 'login_check_locale')), array (  '_controller' => 'Koolawa\\AppsBundle\\Controller\\SecurityController::loginAction',  '_locale' => 'fr',));
        }

        // logout
        if ($pathinfo === '/logout') {
            return array('_route' => 'logout');
        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
