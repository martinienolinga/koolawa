<?php

namespace Koolawa\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('KoolawaCoreBundle:Default:index.html.twig');
    }
}
