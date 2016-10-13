<?php

namespace Koolawa\AjaxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\HttpFoundation\Session\Session;

use Koolawa\CoreBundle\Utils\Log;

class UserController extends Controller
{
	public $repositoryUser;
	public $repositoryGroupUser;
	public $repositoryRule;
	public $manager;
	
	/**
	 * @param ContainerInterface $container
	 */
	public function __construct(ContainerInterface $container)
	{
		$this->container = $container;
	
		$this->repositoryUser = $this->getDoctrine()->getRepository('KoolawaAppsBundle:User');
		//$this->repositoryGroupUser = $this->getDoctrine()->getRepository('T2SAUserBundle:GroupUser');
		//$this->repositoryRule = $this->getDoctrine()->getRepository('T2SAUserBundle:Rule');
		$this->manager = $this->getDoctrine()->getManager();
	}
	
	
    public function getuserAction(Request $request)
    {
        $args = json_decode($request->request->get('args'), true);
        $error = '';

        $id = $args['id'];
        $user = $this->repositoryUser->findOneBy(array('id' => $id));

        $data = array();
        $data['data'] = array(
            'Id' => $user->getId(),
            'text' => $user->getUsername(),
            'username' => $user->getUsername(),
            //'ldapusername' => $user->getLdapusername(),
            //'groupid' => $user->getUsergroupid(),
            //'rules' => $this->ruleToArray($this->getUserRules($user->getId())),
            'nodek' => 'user',
            'iconCls' => 'icon-user',
            'leaf' => true
        );

        $data['message'] = array(
            'error' => $error
        );

        $response = new JsonResponse();
        $response->setData($data);

        return $response;
    }
    
    public function getloggedAction(Request $request)
    {
    	$session = $request->getSession();
    	$response = new JsonResponse();
    
    	if ($session->has('userid'))
    	{
    		$request->request->set('args', json_encode(array('id' => $session->get('userid'))));
    		$response = $this->getuserAction($request);
    	}
    
    	return $response;
    }
}
