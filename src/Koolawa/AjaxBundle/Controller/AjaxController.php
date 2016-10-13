<?php

namespace Koolawa\AjaxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

class AjaxController extends Controller
{
	public function runAction($controller, $action, Request $request)
	{
		//$request = Request::createFromGlobals();
		//$controller = $request->query->get('controller');

		return $this->forward('koolawa_ajax.'.$controller.':'.$action.'Action', array('request' => $request));
	}

}
