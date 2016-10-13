<?php

/* TwigBundle:Exception:exception.css.twig */
class __TwigTemplate_8e4a8af3e6eee604a1ddf90b48b8ff8a91b2435c0fdf8dfc9a01da21342f4fa2 extends Twig_Template
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
        $__internal_e40cbf7ad1375417295229c100dafa5c0434c58e4a87936b146fba6a74abd4a7 = $this->env->getExtension("native_profiler");
        $__internal_e40cbf7ad1375417295229c100dafa5c0434c58e4a87936b146fba6a74abd4a7->enter($__internal_e40cbf7ad1375417295229c100dafa5c0434c58e4a87936b146fba6a74abd4a7_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:exception.css.twig"));

        // line 1
        echo "/*
";
        // line 2
        $this->loadTemplate("@Twig/Exception/exception.txt.twig", "TwigBundle:Exception:exception.css.twig", 2)->display(array_merge($context, array("exception" => (isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")))));
        // line 3
        echo "*/
";
        
        $__internal_e40cbf7ad1375417295229c100dafa5c0434c58e4a87936b146fba6a74abd4a7->leave($__internal_e40cbf7ad1375417295229c100dafa5c0434c58e4a87936b146fba6a74abd4a7_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:exception.css.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  27 => 3,  25 => 2,  22 => 1,);
    }
}
/* /**/
/* {% include '@Twig/Exception/exception.txt.twig' with { 'exception': exception } %}*/
/* *//* */
/* */
