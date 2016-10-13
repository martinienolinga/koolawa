<?php

namespace Koolawa\AppsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;

use Symfony\Component\BrowserKit\Cookie;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

use Koolawa\CoreBundle\Utils\Log;

class SecurityController extends Controller
{
	public function loginAction($_workspace, $_locale, Request $request)
	{
		$session = $request->getSession();
	
		// Si le visiteur est déjà identifié, on le redirige vers l'accueil
		if ($this->get('security.context')->gettoken()->getuser() !== 'anon.') {
			$user = $this->get('security.context')->gettoken()->getuser();
	
			if (!$session->has('userid'))
			{
				$session->set('userid', $user->getId());
				$session->set('username', $user->getUsername());
				//$session->set('usergroupid', $user->getUsergroupid());
	
				Log::write('[INFO][LOGIN] User '.$user->getUsername().' ID#'.$user->getId(), $session);
			}
			$error = "";
	
			return $this->render('KoolawaAppsBundle:Workspace:workspace.html.twig', array(
				// Valeur du précédent nom d'utilisateur entré par l'internaute
				'last_username' => $session->get(SecurityContext::LAST_USERNAME),
				'error'         => $error,
                '_locale'         => $_locale,
                '_workspace'      => $_workspace,
                '_script_name'    => $_SERVER['SCRIPT_NAME'],
                '_request_scheme' => $_SERVER['REQUEST_SCHEME'],
                '_http_host'      => $_SERVER['HTTP_HOST']
			));
		}
	
		$error = $this->getAuthenticationError();
	
		if ($session->has('userid'))
		{
			$session->remove('userid');
			//$session->remove('usergroupid');
			$session->remove('username');
			
			Log::write('[INFO][LOGOUT] User '.$user->getUsername().' ID#'.$user->getId(), $session);
		}
	
	
		return $this->render('KoolawaAppsBundle:Security:login.html.twig', array(
			// Valeur du précédent nom d'utilisateur entré par l'internaute
			'last_username' => $session->get(SecurityContext::LAST_USERNAME),
			'error'         => $error,
			'token'         => $this->generateToken(),
			'_locale'         => $_locale,
            '_script_name'    => $_SERVER['SCRIPT_NAME'],
            '_request_scheme' => $_SERVER['REQUEST_SCHEME'],
            '_http_host'      => $_SERVER['HTTP_HOST']
		));
	}
	
	protected function getAuthenticationError()
	{
		if ($this->get('request')->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
			return $this->get('request')->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
		}
		return $this->get('request')->getSession()->get(SecurityContext::AUTHENTICATION_ERROR);
	}
	
	protected function generateToken()
	{
		$token = $this->get('form.csrf_provider')->generateCsrfToken('authenticate');
		return $token;
	}
}
