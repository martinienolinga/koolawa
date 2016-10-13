<?php

/* TwigBundle:Exception:exception.json.twig */
class __TwigTemplate_27279f539b3bdb90fe4670472c29b3d393fb0d29574568badd0256bfd9227b61 extends Twig_Template
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
        $__internal_a4cea7a36ccceda918143034b84ea7ee149abc9779a8dd542cad0fd18095fb4c = $this->env->getExtension("native_profiler");
        $__internal_a4cea7a36ccceda918143034b84ea7ee149abc9779a8dd542cad0fd18095fb4c->enter($__internal_a4cea7a36ccceda918143034b84ea7ee149abc9779a8dd542cad0fd18095fb4c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.json.twig"));

        // line 1
        echo twig_jsonencode_filter(array("error" => array("code" => (isset($context["status_code"]) ? $context["status_code"] : $this->getContext($context, "status_code")), "message" => (isset($context["status_text"]) ? $context["status_text"] : $this->getContext($context, "status_text")), "exception" => $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "toarray", array()))));
        echo "
";
        
        $__internal_a4cea7a36ccceda918143034b84ea7ee149abc9779a8dd542cad0fd18095fb4c->leave($__internal_a4cea7a36ccceda918143034b84ea7ee149abc9779a8dd542cad0fd18095fb4c_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.json.twig";
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
/* {{ { 'error': { 'code': status_code, 'message': status_text, 'exception': exception.toarray } }|json_encode|raw }}*/
/* */
