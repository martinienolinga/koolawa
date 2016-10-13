<?php

namespace Koolawa\AjaxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\HttpFoundation\Session\Session;

use Koolawa\CoreBundle\Utils\Log;

class StorageController extends Controller
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
	
		//$this->repositoryUser = $this->getDoctrine()->getRepository('KoolawaAppsBundle:User');
		//$this->manager = $this->getDoctrine()->getManager();
	}
	
    public function listdirectoriesAction(Request $request)
    {
    	$session = $request->getSession();
    
    	$args = json_decode($request->request->get('args'), true);
        $error = '';

		$data = array();
		$data['data'] = $this->dirToArray('/var/www/html/koolawa/');

        $data['message'] = array(
            'error' => $error,
            'block' => empty($error)
        );

        $response = new JsonResponse();
        $response->setData($data);
        
        Log::write('[INFO][LIST] List all files ', $request->getSession());
    
    	return $response;
    }
    
    public function getfileAction(Request $request)
    {
    	$session = $request->getSession();
    
    	$args = json_decode($request->request->get('args'), true);
        $error = '';

		$data = array();
		
		$content = file_get_contents($args['path']);
		
        $data['data'] = array(
        	'path' => $args['path'],
			'info' => pathinfo($args['path']),
        	'content' => htmlentities($content)
        );
        
        $data['message'] = array(
            'error' => $error,
            'block' => empty($error)
        );

        $response = new JsonResponse();
        $response->setData($data);
        
        Log::write('[INFO][LIST] List all files ', $request->getSession());
    
    	return $response;
    }

	public function savefileAction(Request $request)
    {
    	$session = $request->getSession();
    
    	$args = json_decode($request->request->get('args'), true);
        $error = '';

		$data = array();
		
		file_put_contents($args['path'], $args['content']);
		$content = file_get_contents($args['path']);
		
        $data['data'] = array(
        	'path' => $args['path'],
			'info' => pathinfo($args['path']),
        	'md5' => md5($content)
        );
        
        $data['message'] = array(
            'error' => $error,
            'block' => empty($error)
        );

        $response = new JsonResponse();
        $response->setData($data);
        
        Log::write('[INFO][LIST] List all files ', $request->getSession());
    
    	return $response;
    }

	public function getstatAction(Request $request)
    {
    	$session = $request->getSession();
    
    	$args = json_decode($request->request->get('args'), true);
        $error = '';

		$data = array();
		
		$stat = stat($args['path']);
		
        $data['data'] = array(
        	'path' => $args['path'],
			'info' => pathinfo($args['path']),
        	'stat' => $stat
        );
        
        $data['message'] = array(
            'error' => $error,
            'block' => empty($error)
        );

        $response = new JsonResponse();
        $response->setData($data);
        
        Log::write('[INFO][LIST] List all files ', $request->getSession());
    
    	return $response;
    }
    
    public function listfilesAction(Request $request)
    {
    	$session = $request->getSession();
    
    	$args = json_decode($request->request->get('args'), true);
        $error = '';

		$data = array();
        $data['data'] = $this->dirToArray($args['path'], 'both', 1);
        
        $data['message'] = array(
            'error' => $error,
            'block' => empty($error)
        );

        $response = new JsonResponse();
        $response->setData($data);
        
        Log::write('[INFO][LIST] List all files ', $request->getSession());
    
    	return $response;
    }
 
	private function dirToArray($dir, $target = 'directories', $recur = null, $idpath = 'root')
	{
		$result = array();
		
		if ($recur === 0) return $result;

		$cdir = scandir($dir);

		$directories = array();
		$files  = array();
		foreach($cdir as $file)
		{
			if(($file != '.') && ($file != '..'))
			{
				if(is_dir($dir.DIRECTORY_SEPARATOR.$file))
				{
					$directories[] = $file;
				}
				else
				{
					$files[] = $file;
				}
			}
		}

		$cdir = array_merge($directories, $files);

		foreach ($cdir as $key => $value)
		{
			if (!in_array($value,array(".","..")))
			{
				$path = $dir.DIRECTORY_SEPARATOR.$value;
				$path = str_replace('//', '/', $path);
				$shortpath = str_replace('/var/www/html/koolawa/', '/Root/', $path);

				if (is_dir($path))
				{
					if (($target === 'directories') || ($target === 'both'))
					{
						$result[] = array(
							/*'Id' => $this->fileid,*/
							'recid' => md5($path),
							'idpath' => $idpath.'>'.md5($path),
							'text' => $value,
							/*'title' => $value,
							'groupid' => 1,
							'nodek' => 'query',*/
							'leaf' => false,
							'path' => $path,
							'shortpath' => $shortpath,
							'children' => $this->dirToArray($path, $target, (($recur === null)?null:($recur - 1)), $idpath.'>'.md5($path))
						);
					}
				}
				else
				{
					if (($target === 'files') || ($target === 'both'))
					{
						$result[] = array(
							/*'Id' => $this->fileid,*/
							'recid' => md5($path),
							'idpath' => $idpath.'>'.md5($path),
							'text' => $value,
							/*'title' => $value,
							'groupid' => 0,
							'nodek' => 'query',*/
							'path' => $path,
							'shortpath' => $shortpath,
							'leaf' => true
						);
					}
				}
			}
		}

		return $result;
	} 

}
