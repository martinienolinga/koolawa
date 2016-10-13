<?php

/* TwigBundle:Exception:exception.rdf.twig */
class __TwigTemplate_fa00b158fb09a7769be6c9d2b5ed598cbc91d3cf36d1291883323fca42552d5a extends Twig_Template
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
        $__internal_42733d815dfafd67bacb2d5edac8f52efcc6eed128d4fb29ec9f86a9c6e13950 = $this->env->getExtension("native_profiler");
        $__internal_42733d815dfafd67bacb2d5edac8f52efcc6eed128d4fb29ec9f86a9c6e13950->enter($__internal_42733d815dfafd67bacb2d5edac8f52efcc6eed128d4fb29ec9f86a9c6e13950_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.rdf.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/exception.xml.twig", "TwigBundle:Exception:exception.rdf.twig", 1)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")))));
        
        $__internal_42733d815dfafd67bacb2d5edac8f52efcc6eed128d4fb29ec9f86a9c6e13950->leave($__internal_42733d815dfafd67bacb2d5edac8f52efcc6eed128d4fb29ec9f86a9c6e13950_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.rdf.twig";
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
/* {% include '@Twig/Exception/exception.xml.twig' with { 'exception': exception } %}*/
/* */
