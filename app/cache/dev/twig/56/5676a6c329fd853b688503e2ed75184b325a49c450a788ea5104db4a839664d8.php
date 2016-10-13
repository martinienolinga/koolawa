<?php

/* TwigBundle:Exception:error.json.twig */
class __TwigTemplate_a60aa7ec4f5a1b6630272dfd12ad8b09c75944cf816d72d6bd7407ced1980a17 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_e13d9dceb6c389bde119aefc1576d1eed771d26ed247449650921053c33b19ce = $this->env->getExtension("native_profiler");
        $__internal_e13d9dceb6c389bde119aefc1576d1eed771d26ed247449650921053c33b19ce->enter($__internal_e13d9dceb6c389bde119aefc1576d1eed771d26ed247449650921053c33b19ce_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.json.twig"));

        // line 1
        echo twig_jsonencode_filter(array("error" => array("code" => (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "message" => (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")))));
        echo "
";
        
        $__internal_e13d9dceb6c389bde119aefc1576d1eed771d26ed247449650921053c33b19ce->leave($__internal_e13d9dceb6c389bde119aefc1576d1eed771d26ed247449650921053c33b19ce_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.json.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {{ { 'error': { 'code': status_code, 'message': status_text } }|json_encode|raw }}*/
/* */
